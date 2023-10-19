const express = require('express')
const router = express.Router()
const {
  getAllCategory,
  seeDetailProduct,
  addWarehouseProduct,
  deleteWarehouseProduct,
  addProduct
} = require('../controller')
const getProduct = require('../controller/product/getProduct')
const { updateProduct } = require('../controller/product/addProduct')

router.get('/allCategory', getAllCategory)
router.get('/all', getProduct.getAllProduct)
router.get('/most-sales', getProduct.mostSales)
router.get('/:productId', seeDetailProduct)
router.post('/warehouse-product', addWarehouseProduct)
router.post('/new', addProduct)
router.patch('/edit-product', updateProduct)
router.delete('/warehouse-product/:warehouseProductId', deleteWarehouseProduct)

module.exports = router
