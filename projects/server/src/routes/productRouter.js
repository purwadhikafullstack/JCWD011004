const express = require('express')
const router = express.Router()
const getProduct = require('../controller/product/getProduct')
const getDetailProduct = require('../controller/product/seeDetailProduct')

router.get('/all', getProduct.getAllProduct)
router.get('/most-sales', getProduct.mostSales)
router.get('/:productId', getDetailProduct.seeDetailProduct)

module.exports = router
