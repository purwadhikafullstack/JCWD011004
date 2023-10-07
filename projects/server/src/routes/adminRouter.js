const express = require('express')
const router = express.Router()
const {
  getUsersSortPagination,
  getWarehouses,

  createWarehouseAdmin,
  verifyAdminAccount
} = require('../controller')

router.get('/user', getUsersSortPagination)
router.get('/warehouses', getWarehouses)
router.post('/create-warehouse-admin', createWarehouseAdmin)
router.patch('/verify-admin/:token', verifyAdminAccount)

module.exports = router
