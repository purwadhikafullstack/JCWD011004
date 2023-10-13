const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/userAuth')
const { courierOngkir } = require('../controller')

router.post('/cost', authenticate, courierOngkir)

module.exports = router
