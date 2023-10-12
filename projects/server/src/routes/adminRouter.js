const express = require('express')
const router = express.Router()
const {
  getUsersSortPagination,
  getWarehouses,
  createWarehouseAdmin,
  verifyAdminAccount,
  updateWarehouseAdmin,
  getAllTrasaction,
  getAllTransactionAdmin
} = require('../controller')

router.get('/user', getUsersSortPagination)
router.get('/warehouses', getWarehouses)
router.post('/create-warehouse-admin', createWarehouseAdmin)
router.patch('/verify-admin/:token', verifyAdminAccount)
router.patch('/update', updateWarehouseAdmin)
router.get('/all-transaction', getAllTrasaction)
router.get('/all-transaction-admin', getAllTransactionAdmin)

module.exports = router
