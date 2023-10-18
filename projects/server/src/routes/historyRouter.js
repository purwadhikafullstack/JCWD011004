const express = require('express')
const router = express.Router()
const {getAllProductStock, getStockHistoryByProduct} = require('../controller')

router.get('/all-history', getAllProductStock)
router.get('/history/:productId', getStockHistoryByProduct)

module.exports = router