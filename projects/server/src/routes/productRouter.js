const express = require('express')
const router = express.Router()
const {
  getAllCategory,
  seeDetailProduct,
  addWarehouseProduct,
  deleteWarehouseProduct
} = require('../controller')
const getProduct = require('../controller/product/getProduct')

router.get('/allCategory', getAllCategory)
router.get('/all', getProduct.getAllProduct)
router.get('/most-sales', getProduct.mostSales)
router.get('/:productId', seeDetailProduct)
router.post('/warehouse-product', addWarehouseProduct)
router.delete('/warehouse-product/:warehouseProductId', deleteWarehouseProduct)

module.exports = router
