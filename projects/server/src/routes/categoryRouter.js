const express = require('express')
const router = express.Router()
const { addCategory, updateCategory, deleteCategory } = require('../controller')

router.post('/', addCategory)
router.patch('/:categoryId', updateCategory)
router.delete('/:categoryId', deleteCategory)

module.exports = router
