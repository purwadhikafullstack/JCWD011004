const express = require('express')
const router = express.Router()
const { addItem, removeItem } = require('../controller')
const { authenticate } = require('../middleware/userAuth')

router.post('/additem', authenticate, addItem)
router.patch('/removeItem', authenticate, removeItem)

module.exports = router
