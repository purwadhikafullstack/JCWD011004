const express = require('express')
const router = express.Router()
const addingItem = require('../controller/card/addingItem')

router.post('/addItem', addingItem.addItem)
router.put('/removeItem', addingItem.removeItem)

module.exports = router