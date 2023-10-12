const express = require('express')
const router = express.Router()
const { courierOngkir } = require('../controller')

router.post('/cost', courierOngkir)

module.exports = router
