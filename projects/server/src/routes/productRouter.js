const express = require('express')
const router = express.Router()
const { getAllCategory } = require('../controller')

router.get('/allCategory', getAllCategory)

module.exports = router
