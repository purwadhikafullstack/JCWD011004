const express = require('express')
const router = express.Router()
const {
  createWarehouses,
  updateWarehouses,
  deleteWarehouses,
  getWarehouses
} = require('../controller')

router.post('/create', createWarehouses)
router.patch('/update/:id', updateWarehouses)
router.delete('/delete/:id', deleteWarehouses)
router.get('/get-all', getWarehouses)
module.exports = router
