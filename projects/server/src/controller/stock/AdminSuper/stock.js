const db = require('../../../../models')
const StockJournal = db.StockJournal
const Warehouse_Product = db.Warehouse_Product
const Warehouse = db.Warehouse
const Product = db.Product

const getAllStock = async (req, res) => {
  try {
    const { warehouseId } = req.query
    const warehouseProducts = await Warehouse_Product.findAll({
      include: [{ model: Product }, { model: Warehouse }],
      where: warehouseId ? { WarehouseId: warehouseId } : {}
    })

    return res.status(200).json(warehouseProducts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createStockJournal = async (req, res) => {
  try {
    const { warehouseId, warehouseProductId, quantity, description, action } =
      req.body
    if (
      (action === 'increment' && quantity < 0) ||
      (action === 'decrement' && quantity < 0)
    ) {
      return res
        .status(400)
        .json({ message: 'Kuantitas tidak sesuai dengan tindakan' })
    }
    const stockJournal = await StockJournal.create({
      warehouseId,
      warehouseProductId,
      quantity,
      description,
      action
    })

    const updatedStock = action === 'increment' ? quantity : -quantity
    await Warehouse_Product.increment('stock', {
      by: updatedStock,
      where: { id: warehouseProductId }
    })

    return res.status(201).json(stockJournal)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getStockJournalsByProduct = async (req, res) => {
  try {
    const { productId } = req.params

    const stockJournals = await StockJournal.findAll({
      where: { warehouseProductId: productId },
      include: [{ model: Warehouse }]
    })

    return res.status(200).json(stockJournals)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getStockByProductAndWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.query // Change to req.query

    const warehouseProduct = await Warehouse_Product.findAll({
      where: { warehouseId }
    })

    if (!warehouseProduct) {
      return res
        .status(404)
        .json({ message: 'Produk tidak ditemukan di gudang ini' })
    }

    return res.status(200).json(warehouseProduct)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getAllStock,
  createStockJournal,
  getStockJournalsByProduct,
  getStockByProductAndWarehouse
}
