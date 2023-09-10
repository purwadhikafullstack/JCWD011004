const express = require('express');
const router = express.Router();
const getProduct = require('../controller/product/getProduct')


router.get('/all', getProduct.getAllProduct)
router.get('/most-sales', getProduct.getMostSales)

module.exports = router