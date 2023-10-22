const db = require('../../../../models')
const Warehouse_Product = db.Warehouse_Product
const Product = db.Product
const Warehouse = db.Warehouse

const getAllProductStock = async (req, res) => {
  try {
    const { warehouseId } = req.query
    const filterOptions = warehouseId ? { WarehouseId: warehouseId } : {}

    const warehouseProducts = await Warehouse_Product.findAll({
      include: [{ model: Product }, { model: Warehouse }],
      where: filterOptions
    })

    return res.status(200).json(warehouseProducts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = getAllProductStock
