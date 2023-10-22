const db = require('../../../../models')
const StockJournal = db.StockJournal
const Warehouse_Product = db.Warehouse_Product
const Product = db.Product
const { Op } = require('sequelize')

const getStockReport = async (req, res) => {
  try {
    let filterByDate = {}

    if (req.query.createdAt) {
      const { createdAt, warehouseId } = req.query
      const month = new Date(createdAt).getMonth() + 1

      filterByDate = {
        createdAt: {
          [Op.gte]: new Date(`${createdAt}-01`), // Awal bulan
          [Op.lt]: new Date(new Date(`${createdAt}-01`).setMonth(month + 1)) // Akhir bulan
        }
      }

      if (warehouseId) {
        // Jika warehouseId tersedia, tambahkan kondisi ke filterByDate
        filterByDate.warehouseId = warehouseId
      }
    }

    const report = await StockJournal.findAll({
      attributes: ['warehouseProductId'],
      where: filterByDate,
      group: ['warehouseProductId'],
      raw: true,
      order: [['warehouseProductId']],
      include: [
        {
          model: Warehouse_Product,
          attributes: ['stock'],
          include: [
            {
              model: Product,
              attributes: ['name']
            }
          ]
        }
      ]
    })

    const summaryReport = await Promise.all(
      report.map(async (entry) => {
        const [totalAddition, totalSubtraction] = await Promise.all([
          StockJournal.sum('quantity', {
            where: {
              warehouseProductId: entry.warehouseProductId,
              action: 'increment',
              ...filterByDate
            }
          }),
          StockJournal.sum('quantity', {
            where: {
              warehouseProductId: entry.warehouseProductId,
              action: 'decrement',
              ...filterByDate
            }
          })
        ])

        const endingStock =
          (entry['Warehouse_Product.stock'] || 0) +
          (totalAddition || 0) -
          (totalSubtraction || 0)

        const stockJournal = await StockJournal.findOne({
          where: {
            warehouseProductId: entry.warehouseProductId,
            ...filterByDate
          }
        })

        return {
          productId: entry.warehouseProductId,
          productName: entry['Warehouse_Product.Product.name'],
          description: stockJournal ? stockJournal.description : null,
          initialStock: entry['Warehouse_Product.stock'],
          totalAddition: totalAddition || 0,
          totalSubtraction: totalSubtraction || 0,
          endingStock: endingStock
        }
      })
    )

    res.json(summaryReport)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

module.exports = getStockReport
