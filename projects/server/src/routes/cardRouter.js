const express = require('express')
const router = express.Router()
const { addItem, removeItem } = require('../controller')


router.post('/addItem', addItem)
router.put('/removeItem', removeItem)


module.exports = router