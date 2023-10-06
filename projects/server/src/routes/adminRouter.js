const express = require('express')
const router = express.Router()
const { getUsersSortPagination } = require('../controller')

router.get('/user', getUsersSortPagination)

module.exports = router
