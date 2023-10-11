//routes/userUpdate.js
const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/userAuth')
const { productOngkir } = require('../controller')

router.post('/cost', authenticate, productOngkir)

module.exports = router
