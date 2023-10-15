const express = require('express')
const router = express.Router()
const {
  getAllOrderStatus,
  createOrder,
  updateStatus,
  updateAllByRangeTime
} = require('../controller')
const { authenticate } = require('../middleware/userAuth')

router.get('/all-status/', getAllOrderStatus)
router.post('/order', authenticate, createOrder)
router.patch('/status/:transactionId', authenticate, updateStatus)
router.patch('/status-auto', updateAllByRangeTime)

module.exports = router
