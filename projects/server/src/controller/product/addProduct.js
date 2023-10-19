const db = require('../../../models')
const Product = db.Product

const product = {
  addProduct: async (req, res) => {
    try {
      const { name, price, description, weight, categoryId } = req.body

      const product = await db.sequelize.transaction(async (t) => {
        const getProduct = await Product.findOne(
          {
            where: { name }
          },
          {
            transaction: t
          }
        )

        if (getProduct) {
          if (getProduct.categoryId === 99) {
            const data = await Product.update(
              {
                categoryId,
                isActive: 1
              },
              { where: { id: getProduct.id }, transaction: t }
            )
            return data
          } else {
            throw new Error('Duplicate product name')
          }
        } else {
          const data = await Product.create(
            {
              name,
              price,
              description,
              weight,
              categoryId
            },
            {
              transaction: t
            }
          )
          return data
        }
      })

      return res.status(200).json({
        success: 'Create product succeed',
        product
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Create product failed',
        message: err.message
      })
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, description, weight, categoryId, isActive, id } =
        req.body

      const dataProductId = parseInt(id)
      const dataCategoryId = parseInt(categoryId)

      const product = await db.sequelize.transaction(async (t) => {
        const getProduct = await Product.findOne(
          {
            where: { name }
          },
          {
            transaction: t
          }
        )

        if (getProduct) {
          if (getProduct.id !== id) {
            throw new Error('Duplicate product name')
          } else {
            const data = await Product.update(
              {
                name,
                price,
                description,
                weight,
                isActive,
                categoryId: dataCategoryId
              },
              {
                where: { id: dataProductId },
                transaction: t
              }
            )
            return data
          }
        } else {
          const data = await Product.update(
            {
              name,
              price,
              description,
              weight,
              isActive,
              categoryId: dataCategoryId
            },
            {
              where: { id: dataProductId },
              transaction: t
            }
          )
          return data
        }
      })

      return res.status(200).json({
        success: 'Update product succeed',
        product
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Update product failed',
        message: err.message
      })
    }
  }
}

module.exports = product
