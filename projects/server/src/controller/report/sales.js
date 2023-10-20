const db = require('../../../models')
const Transaction = db.Transaction
const TransactionItem = db.Transaction_Item
const TransactionStatus = db.Transaction_Status
const Product = db.Product
const Category = db.Category
const Sequelize = require('sequelize')

const salesReport = {
  getSalesReport: async (req, res) => {
    try {
      const year = req.query.year
      const month = req.query.month
      const filter = req.query.filter

      const salesReports = await Transaction.findAll({
        include: [
          {
            model: TransactionItem,
            include: [
              {
                model: Product,
                include: [
                  {
                    model: Category,
                    attributes: {
                      exclude: ['createdAt', 'updatedAt']
                    }
                  }
                ],
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          },
          {
            model: TransactionStatus,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ],
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn('YEAR', Sequelize.col('Transaction.createdAt')),
              year
            ),
            Sequelize.where(
              Sequelize.fn('MONTH', Sequelize.col('Transaction.createdAt')),
              month
            )
          ]
        }
      })

      if (filter === 'category') {
        const categoryTotals = new Map()
        let overallCategoryTotal = 0
        let overallCategoryQuantity = 0

        salesReports.forEach((report) => {
          if (report.Transaction_Items) {
            report.Transaction_Items.forEach((item) => {
              if (item.Product) {
                const category = item.Product.Category
                const total = item.totalPrice
                const quantity = item.quantity

                if (categoryTotals.has(category.id)) {
                  categoryTotals.get(category.id).total += total
                  categoryTotals.get(category.id).quantity += quantity
                } else {
                  categoryTotals.set(category.id, {
                    category: category.name,
                    total: total,
                    quantity: quantity
                  })
                }

                overallCategoryTotal += total
                overallCategoryQuantity += quantity
              }
            })
          }
        })

        const categoryTotalsArray = Array.from(categoryTotals.values())

        return res.status(200).json({
          success: 'Get sales report succeed',
          reports: salesReports,
          categoryTotals: categoryTotalsArray,
          overallCategoryTotal: overallCategoryTotal,
          overallCategoryQuantity: overallCategoryQuantity
        })
      } else {
        const productTotals = new Map()
        let overallProductTotal = 0
        let overallProductQuantity = 0

        salesReports.forEach((report) => {
          if (report.Transaction_Items) {
            report.Transaction_Items.forEach((item) => {
              if (item.Product) {
                const product = item.Product
                const total = item.totalPrice
                const quantity = item.quantity

                if (productTotals.has(product.id)) {
                  productTotals.get(product.id).total += total
                  productTotals.get(product.id).quantity += quantity
                } else {
                  productTotals.set(product.id, {
                    product: product.name,
                    total: total,
                    quantity: quantity
                  })
                }

                overallProductTotal += total
                overallProductQuantity += quantity
              }
            })
          }
        })

        const productTotalsArray = Array.from(productTotals.values())

        return res.status(200).json({
          success: 'Get sales report succeed',
          reports: salesReports,
          productTotals: productTotalsArray,
          overallProductTotal: overallProductTotal,
          overallProductQuantity: overallProductQuantity
        })
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Get data failed',
        message: err.message
      })
    }
  }
}

module.exports = salesReport
