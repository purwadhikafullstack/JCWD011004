const express = require('express')
const router = express.Router()
const {getAllProductStock, getStockReport, getStockReportWarehouse, getWarehouseId} = require('../controller')

router.get('/all-history', getAllProductStock)
router.get('/history', getStockReport)
router.get('/history-warehouse/:id', getStockReportWarehouse)
router.get('/get-by-user/:userId', getWarehouseId)


module.exports = router