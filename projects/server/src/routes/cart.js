const express = require('express')
const router = express.Router()
const {
  addItem,
  removeItem,
  getCartItems,
  getCartItemsSortPagination,
  updateItem
} = require('../controller')

router.post('/additem', addItem)
router.patch('/removeitem', removeItem)
router.patch('/update-item', updateItem)
router.get('/items', getCartItems)
router.get('/list-items', getCartItemsSortPagination)

module.exports = router
