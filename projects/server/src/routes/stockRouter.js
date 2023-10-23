const express = require('express')
const router = express.Router()
const {
  getAllStock,
  createStockJournal,
  getStockJournalsByProduct,
  getStockByProductAndWarehouse,
  createBulkStockJournal
} = require('../controller')
const { getAllStockWarehouse } = require('../controller')

router.get('/getAllStock', getAllStock)
router.post('/create-stock-journal', createStockJournal)
router.post('/create-bulk-stock-journal', createBulkStockJournal)
router.get('/journals-product/:productId', getStockJournalsByProduct)
router.get('/stock-product-warehouse', getStockByProductAndWarehouse)
router.get('/getAllStockWarehouse/:id', getAllStockWarehouse)

module.exports = router
