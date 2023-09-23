const express = require('express');
const router = express.Router();
const { uploadReceipt } = require('../controller/payment/uploadReceipt');
const {upload} = require('../middleware/receiptMiddleware');

router.post('/proof/:id', upload.single('receipt'), uploadReceipt);

module.exports = router;
