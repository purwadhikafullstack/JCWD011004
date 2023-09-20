const express = require('express')
const router = express.Router()
const { getAllCategory } = require('../controller')
const getProduct = require('../controller/product/getProduct')
const { seeDetailProduct } = require('../controller')

router.get('/allCategory', getAllCategory)
router.get('/all', getProduct.getAllProduct)
router.get('/most-sales', getProduct.mostSales)
router.get('/:productId', seeDetailProduct)

module.exports = router
