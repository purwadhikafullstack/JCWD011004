const express = require('express')
const router = express.Router()
const { getSalesReport } = require('../controller')

router.get('/sales', getSalesReport)

module.exports = router
