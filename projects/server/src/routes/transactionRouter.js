const express = require('express')
const router = express.Router()

const {
  rejectPayment,
  updatePaymentStatus,
  getAllOrderStatus,
  createOrder,
  updateStatus
} = require('../controller')
const { getPaymentProofImage } = require('../service/paymentService')

const { authenticate } = require('../middleware/userAuth')

router.put('/payment/:id', updatePaymentStatus)
router.put('/reject-payment/:id', rejectPayment)
router.get('/payment-proof/:transactionId', getPaymentProofImage)
router.get('/all-status/', getAllOrderStatus)
router.post('/order', authenticate, createOrder)
router.patch('/status/:transactionId', authenticate, updateStatus)

module.exports = router
