const express = require('express')
const router = express.Router()
const {
  getUsersSortPagination,
  getWarehouses,
  createWarehouseAdmin,
  verifyAdminAccount,
  updateWarehouseAdmin
} = require('../controller')

router.get('/user', getUsersSortPagination)
router.get('/warehouses', getWarehouses)
router.post('/create-warehouse-admin', createWarehouseAdmin)
router.patch('/verify-admin/:token', verifyAdminAccount)
router.patch('/update', updateWarehouseAdmin)

module.exports = router
