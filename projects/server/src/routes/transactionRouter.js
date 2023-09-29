const express = require('express')
const router = express.Router()
const {getAllOrderStatus}  = require('../controller/transaction/getOrderStatus')

router.get('/all-status/', getAllOrderStatus)

module.exports = router