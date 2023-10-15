const express = require('express')
const router = express.Router()
const {
  getAllOrderStatus
} = require('../controller/transaction/getOrderStatus')
const { rejectPayment, updatePaymentStatus } = require('../controller')
const { getPaymentProofImage } = require('../service/paymentService')

router.get('/all-status/', getAllOrderStatus)
router.get('/payment-proof/:transactionId', getPaymentProofImage)
router.put('/reject-payment/:id', rejectPayment)
router.put('/payment/:id', updatePaymentStatus)

module.exports = router
