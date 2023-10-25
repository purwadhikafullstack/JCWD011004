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

const createBulkStockJournal = async (req, res) => {
  try {
    const { warehouseId, productId, quantity, description, action } = req.body

    const response = await Warehouse_Product.findAll({ where: { warehouseId } })

    const filteredResponse = response.filter((item) =>
      productId.includes(item.productId)
    )
    const warehouseProductId = filteredResponse.map((item) => item.id)

    if (
      (action === 'increment' && quantity < 0) ||
      (action === 'decrement' && quantity < 0)
    ) {
      return res
        .status(400)
        .json({ message: 'Kuantitas tidak sesuai dengan tindakan' })
    }

    const warehouseProductIds = Array.isArray(warehouseProductId)
      ? warehouseProductId
      : [warehouseProductId]
    const quantities = Array.isArray(quantity) ? quantity : [quantity]

    if (warehouseProductIds.length !== quantities.length) {
      return res.status(400).json({
        message: 'Mismatch between warehouseProductId and quantity arrays'
      })
    }

    const stockJournals = []

    for (let i = 0; i < warehouseProductIds.length; i++) {
      const updatedStock =
        action === 'increment' ? quantities[i] : -quantities[i]

      const stockJournal = {
        warehouseId,
        warehouseProductId: warehouseProductIds[i],
        quantity: quantities[i],
        description,
        action
      }

      const createdStockJournal = await StockJournal.create(stockJournal)
      stockJournals.push(createdStockJournal)

      await Warehouse_Product.increment('stock', {
        by: updatedStock,
        where: { id: warehouseProductIds[i] }
      })
    }

    // return res.status(201).json(response)
    return res.status(201).json(stockJournals)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getAllStock,
  createStockJournal,
  getStockJournalsByProduct,
  getStockByProductAndWarehouse,
  createBulkStockJournal
}
