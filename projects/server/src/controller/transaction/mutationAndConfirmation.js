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
    // Mencari transaksi berdasarkan id
    const transaction = await Transaction.findOne({
      where: { id: req.params.id },
      include: [Transaction_Item, User] // Menambahkan User ke include
    })

    // Jika transaksi tidak ditemukan, kirim pesan error
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    // Memeriksa setiap item dalam transaksi
    for (let item of transaction.Transaction_Items) {
      let warehouseProduct = await Warehouse_Product.findOne({
        where: { productId: item.productId }
      })

      // Jika jumlah item lebih besar dari stok di gudang, cari gudang lain dengan stok cukup
      while (item.quantity > warehouseProduct.stock) {
        let closestWarehouse = await getClosestWarehouseWithStock(
          item.productId,
          warehouseProduct.warehouseId
        )

        // Jika tidak ada gudang lain dengan stok cukup, perbarui status transaksi dan kirim email notifikasi ke pengguna
        if (!closestWarehouse) {
          transaction.transactionStatusId = 5
          await transaction.save()
          await sendEmail(
            transaction.User.email,
            'Refund Needed',
            `There is not enough stock in any warehouse for your order. Please contact customer support for a refund. Your invoice number is ${transaction.invoiceNumber}.`
          )
          return res.json({ message: 'Not enough stock in any warehouse' })
        }

        // Jika ada gudang lain dengan stok cukup, buat mutasi stok dari gudang terdekat ke gudang asli
        let mutationQuantity = Math.min(
          item.quantity - warehouseProduct.stock,
          closestWarehouse.stock
        )
        const mutation = await createMutation(
          closestWarehouse.id,
          warehouseProduct.warehouseId,
          mutationQuantity
        )

        // Buat jurnal stok untuk perubahan stok
        await createStockJournal(
          closestWarehouse.id,
          closestWarehouse.Warehouse_Product.id,
          -mutationQuantity,
          'decrement',
          `mutation_${mutation.id}`
        )
        await createStockJournal(
          warehouseProduct.warehouseId,
          warehouseProduct.id,
          mutationQuantity,
          'increment',
          `mutation_${mutation.id}`
        )

        // Perbarui stok di kedua gudang dan simpan perubahan
        warehouseProduct.stock += mutationQuantity
        closestWarehouse.stock -= mutationQuantity
        await warehouseProduct.save()
        await closestWarehouse.save()
      }

      // Buat jurnal stok untuk penjualan dan perbarui stok di gudang asli
      await createStockJournal(
        warehouseProduct.warehouseId,
        warehouseProduct.id,
        -item.quantity,
        'decrement',
        `sales_${transaction.id}`
      )
      warehouseProduct.stock -= item.quantity
      await warehouseProduct.save()
    }

    // Perbarui status transaksi dan simpan perubahan
    transaction.transactionStatusId = 3
    transaction.paymentStatus = true
    await transaction.save()

    // Kirim email notifikasi ke pengguna bahwa pesanan mereka sedang dikirim dan kirim pesan sukses ke pengguna
    await sendEmail(
      transaction.User.email,
      'Order Shipped',
      `Your order has been shipped. Your invoice number is ${transaction.invoiceNumber}.`
    )
    res.json({ message: 'Payment confirmed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Fungsi untuk mendapatkan gudang terdekat dengan stok cukup untuk produk tertentu
const getClosestWarehouseWithStock = async (productId, warehouseId) => {
  try {
    const warehouses = await Warehouse.findAll({
      include: [
        {
          model: Warehouse_Product,
          where: { productId: productId, stock: { [Op.gt]: 0 } }
        }
      ]
    })

    const currentWarehouse = warehouses.find(
      (warehouse) => warehouse.id === warehouseId
    )
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

    return warehouses.length > 0 ? warehouses[0] : null
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
const createMutation = async (fromWarehouseId, toWarehouseId, quantity) => {
  try {
    const mutation = await Mutation.create({
      fromWarehouse: fromWarehouseId,
      toWarehouse: toWarehouseId,
      quantity: quantity,
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
