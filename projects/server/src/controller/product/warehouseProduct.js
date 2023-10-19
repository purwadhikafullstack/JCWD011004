const db = require('../../../models')
const WarehouseProduct = db.Warehouse_Product
const Warehousedb = db.Warehouse

const warehouseProduct = {
  addWarehouseProduct: async (req, res) => {
    try {
      const { warehouseId, productId } = req.body

      const product = await db.sequelize.transaction(async (t) => {
        const productResponse = await WarehouseProduct.create(
          {
            warehouseId,
            productId
          },
          {
            transaction: t
          }
        )

        const Warehouse = await Warehousedb.findOne(
          {
            where: { id: warehouseId }
          },
          {
            transaction: t
          }
        )

        return {
          productResponse,
          Warehouse
        }
      })

      return res.status(200).json({
        success: 'Create warehouse product succeed',
        product
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Create warehouse product failed',
        message: err.message
      })
    }
  },

  deleteWarehouseProduct: async (req, res) => {
    try {
      const warehouseProductId = parseInt(req.params.warehouseProductId)

      const product = await db.sequelize.transaction(async (t) => {
        const productResponse = await WarehouseProduct.destroy(
          {
            where: { id: warehouseProductId },
            transaction: t
          },
          { transaction: t }
        )

        return { productResponse }
      })

      return res.status(200).json({
        success: 'Delete warehouse product succeed',
        product
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Delete warehouse product failed',
        message: err.message
      })
    }
  }
}

module.exports = warehouseProduct
