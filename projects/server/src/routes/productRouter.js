const express = require('express');
const router = express.Router();
const getProduct = require('../controller/product/getProduct')

router.get('/all', getProduct.getAllProduct)

module.exports = router