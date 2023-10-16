const nodemailer = require('nodemailer')
const { Op } = require('sequelize')
const db = require('../../../models')
const Transaction = db.Transaction
const Transaction_Item = db.Transaction_Item
const Warehouse_Product = db.Warehouse_Product
const Warehouse = db.Warehouse
const Mutation = db.Mutation
const StockJournal = db.StockJournal
const User = db.User

// Membuat transporter untuk nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
})

// Fungsi untuk mengirim email
const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: subject,
    text: text
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    console.error(err)
  }
}

// Fungsi utama untuk memperbarui status pembayaran
const updatePaymentStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id },
      include: [
        Transaction_Item,
        User,
        { model: Warehouse, include: [Warehouse_Product] }
      ]
    })

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    let isOrderFulfilled = true

    for (let item of transaction.Transaction_Items) {
      let warehouseProduct = transaction.Warehouse.Warehouse_Products.find(
        (wp) =>
          wp.warehouseId === transaction.warehouseId &&
          wp.productId === item.productId
      )

      if (!warehouseProduct) {
        let newTransactionItem = await Warehouse_Product.create({
          productId: item.productId,
          warehouseId: transaction.warehouseId,
          stock: 0
        })

        const closestWarehouses = await getClosestWarehousesWithStock(
          item.productId,
          transaction.warehouseId,
          item.quantity
        )

        for (let closestWarehouse of closestWarehouses) {
          let warehouseProductClosest = await Warehouse_Product.findOne({
            where: {
              warehouseId: closestWarehouse.id,
              productId: item.productId
            }
          })

          if (
            warehouseProductClosest &&
            item.quantity <= warehouseProductClosest.stock
          ) {
            let mutationQuantity = item.quantity

            const mutation = await createMutation(
              closestWarehouse.id,
              transaction.warehouseId,
              mutationQuantity,
              item.productId
            )

            // Buat jurnal stok untuk perubahan stok
            await createStockJournal(
              closestWarehouse.id,
              warehouseProductClosest.id,
              mutationQuantity,
              'decrement',
              `mutation_${mutation.id}`
            )
            await createStockJournal(
              transaction.warehouseId,
              newTransactionItem.id,
              mutationQuantity,
              'increment',
              `mutation_${mutation.id}`
            )
            await createStockJournal(
              transaction.warehouseId,
              newTransactionItem.id,
              mutationQuantity,
              'decrement',
              `sales_${transaction.id}`
            )

            // Perbarui stok di kedua gudang dan simpan perubahan
            newTransactionItem.stock = 0
            await newTransactionItem.save()
            warehouseProductClosest.stock -= mutationQuantity
            await warehouseProductClosest.save()
            break // Keluar dari loop setelah menemukan gudang dengan stok cukup
          }
        }
      } else {
        if (warehouseProduct && item.quantity <= warehouseProduct.stock) {
          await createStockJournal(
            warehouseProduct.warehouseId,
            warehouseProduct.id,
            item.quantity,
            'decrement',
            `sales_${transaction.id}`
          )
          warehouseProduct.stock -= item.quantity
          await warehouseProduct.save()
        } else {
          const closestWarehouses = await getClosestWarehousesWithStock(
            item.productId,
            transaction.warehouseId,
            item.quantity - warehouseProduct.stock
          )

          for (let closestWarehouse of closestWarehouses) {
            let warehouseProductClosest = await Warehouse_Product.findOne({
              where: {
                warehouseId: closestWarehouse.id,
                productId: item.productId
              }
            })

            if (
              warehouseProductClosest &&
              item.quantity <=
                warehouseProductClosest.stock + warehouseProduct.stock
            ) {
              let mutationQuantity = item.quantity - warehouseProduct.stock

              const mutation = await createMutation(
                closestWarehouse.id,
                transaction.warehouseId,
                mutationQuantity,
                item.productId
              )

              // Buat jurnal stok untuk perubahan stok
              await createStockJournal(
                closestWarehouse.id,
                warehouseProductClosest.id,
                mutationQuantity,
                'decrement',
                `mutation_${mutation.id}`
              )
              await createStockJournal(
                transaction.warehouseId,
                warehouseProduct.id,
                mutationQuantity,
                'increment',
                `mutation_${mutation.id}`
              )
              await createStockJournal(
                transaction.warehouseId,
                warehouseProduct.id,
                mutationQuantity,
                'decrement',
                `sales_${transaction.id}`
              )

              // Perbarui stok di kedua gudang dan simpan perubahan
              warehouseProduct.stock = 0
              await warehouseProduct.save()

              warehouseProductClosest.stock -= mutationQuantity
              await warehouseProductClosest.save()

              break // Keluar dari loop setelah menemukan gudang dengan stok cukup
            }
          }
        }
      }
    }

    if (isOrderFulfilled) {
      transaction.transactionStatusId = 2
      transaction.paymentStatus = true
      await transaction.save()

      await sendEmail(
        transaction.User.email,
        'Order Progressed',
        `Your order has been progressed. Your invoice number is ${transaction.invoiceNo}.`
      )
      res.json({ message: 'Payment confirmed successfully' })
    } else {
      transaction.transactionStatusId = 5
      transaction.paymentStatus = true
      await transaction.save()
      await sendEmail(
        transaction.User.email,
        'Order Cancelled',
        `Order Cancelled. There is not enough stock in any warehouse for your order. Please contact customer support for a refund. Your invoice number is ${transaction.invoiceNo}.`
      )
      res.json({ message: 'Order cancelled due to insufficient stock' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Fungsi untuk mendapatkan gudang terdekat dengan stok cukup untuk produk tertentu
const getClosestWarehousesWithStock = async (
  productId,
  warehouseId,
  quantity
) => {
  try {
    const warehouses = await Warehouse.findAll({
      include: [
        {
          model: Warehouse_Product,
          where: { productId: productId, stock: { [Op.gte]: quantity } }
        }
      ]
    })
    // Throw an error if there are no warehouses with the requested product in stock
    if (warehouses.length === 0) {
      throw new Error(`Product with id ${productId} is out of stock`)
    }
    // Mencari currentWarehouse secara terpisah
    const currentWarehouse = await Warehouse.findByPk(warehouseId)

    // Tambahkan pengecekan ini di sini
    if (!currentWarehouse) {
      throw new Error(`Warehouse with id ${warehouseId} not found`)
    }

    warehouses.forEach((warehouse) => {
      const distance = calculateDistance(
        currentWarehouse.longitude,
        currentWarehouse.latitude,
        warehouse.longitude,
        warehouse.latitude
      )
      warehouse.dataValues.distance = distance
    })

    warehouses.sort((a, b) => a.distance - b.distance)
    // console.log(warehouses, 'ini sorted warehouses')
    return warehouses
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Fungsi untuk menghitung jarak antara dua titik berdasarkan koordinat longitude dan latitude
const calculateDistance = (lon1, lat1, lon2, lat2) => {
  const R = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

// Fungsi untuk mengubah derajat menjadi radian
const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

// Fungsi untuk membuat mutasi stok
const createMutation = async (
  fromWarehouseId,
  toWarehouseId,
  quantity,
  productId
) => {
  try {
    const mutation = await Mutation.create({
      fromWarehouse: fromWarehouseId,
      toWarehouse: toWarehouseId,
      quantity: quantity,
      productId: productId,
      description: 'Stock',
      action: 'Transfer'
    })
    return mutation
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Fungsi untuk membuat jurnal stok
const createStockJournal = async (
  warehouseId,
  warehouseProductId,
  quantity,
  action,
  description
) => {
  try {
    const stockJournal = await StockJournal.create({
      warehouseId: warehouseId,
      warehouseProductId: warehouseProductId,
      quantity: quantity,
      action: action,
      description: description // 'mutation_(mutationId)', 'sales_(transactionId)', atau 'updatestock'
    })

    return stockJournal
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = {
  updatePaymentStatus
}
