const express = require('express')
const router = express.Router()
// const { authenticate } = require('../middleware/userAuth')
const {
  getUsersSortPagination,
  getWarehouses,
  createWarehouseAdmin,
  verifyAdminAccount,
  updateWarehouseAdmin,
  getAllTrasaction,
  getAllTransactionAdmin,
  getAdminInfo
} = require('../controller')

router.get('/user', getUsersSortPagination)
router.get('/warehouses', getWarehouses)
router.post('/create-warehouse-admin', createWarehouseAdmin)
router.patch('/verify-admin/:token', verifyAdminAccount)
router.patch('/update', updateWarehouseAdmin)
router.get('/all-transaction', getAllTrasaction)
router.get('/all-transaction-admin/:id', getAllTransactionAdmin)
router.get('/info', getAdminInfo)

module.exports = router
