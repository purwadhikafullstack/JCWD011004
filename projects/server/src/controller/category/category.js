const db = require('../../../models')
const Category = db.Category
const Product = db.Product

const categoryAdmin = {
  addCategory: async (req, res) => {
    try {
      const { name } = req.body
      const data = name.toUpperCase()

      const category = await db.sequelize.transaction(async (t) => {
        const getCategory = await Category.findOne(
          {
            where: { name: data }
          },
          {
            transaction: t
          }
        )

        if (getCategory) {
          throw new Error('Duplicate category name')
        }

        const categoryResponse = await Category.create(
          {
            name: data
          },
          {
            transaction: t
          }
        )
        return categoryResponse
      })

      return res.status(200).json({
        success: 'Create category succeed',
        category
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Create category failed',
        message: err.message
      })
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body
      const categoryId = parseInt(req.params.categoryId)
      const data = name.toUpperCase()

      const category = await db.sequelize.transaction(async (t) => {
        const getCategory = await Category.findOne(
          {
            where: { name: data }
          },
          {
            transaction: t
          }
        )

        if (getCategory) {
          if (getCategory.id !== categoryId) {
            throw new Error('Duplicate category name')
          }
        }

        const categoryResponse = await Category.update(
          {
            name: data
          },
          { where: { id: categoryId }, transaction: t }
        )
        return categoryResponse
      })

      return res.status(200).json({
        success: 'Update category succeed',
        category
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Update category failed',
        message: err.message
      })
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId)

      const category = await db.sequelize.transaction(async (t) => {
        const getData = await Product.update(
          { categoryId: 99 },
          { where: { categoryId }, transaction: t }
        )

        await Category.destroy({
          where: { id: categoryId },
          transaction: t
        })

        return { updatedProduct: getData }
      })

      return res.status(200).json({
        success: 'Delete category succeed',
        category
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Delete category failed',
        message: err.message
      })
    }
  }
}

module.exports = categoryAdmin
