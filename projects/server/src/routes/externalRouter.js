const express = require('express')
const router = express.Router()
const { province, cityRegency } = require('../controller')
const { longlat } = require('../controller')

router.get('/province', province)
router.get('/city', cityRegency)
router.get('/longlat', longlat)

module.exports = router
