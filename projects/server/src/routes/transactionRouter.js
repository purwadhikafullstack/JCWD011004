const express = require('express')
const router = express.Router()
const { getAllOrderStatus, createOrder } = require('../controller')
const { authenticate } = require('../middleware/userAuth')

router.get('/all-status/', getAllOrderStatus)
router.post('/order', authenticate, createOrder)

module.exports = router
