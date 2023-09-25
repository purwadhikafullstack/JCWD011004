const express = require('express')
const router = express.Router()
const {
  addItem,
  removeItem,
  getCartItems,
  getCartItemsSortPagination
} = require('../controller')

router.post('/additem', addItem)
router.patch('/removeItem', removeItem)
router.get('/items', getCartItems)
router.get('/list-items', getCartItemsSortPagination)

module.exports = router
