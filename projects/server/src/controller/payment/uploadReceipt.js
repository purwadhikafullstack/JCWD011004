const db = require('../../../models');
const Transaction = db.Transaction;
const { validationResult } = require('express-validator');
const fs = require('fs');

const uploadPaymentProofController = async (req, res) => {
  try {
    const { invoiceNo, userId } = req.body;
    const fileName = Date.now() + '-' + req.file.originalname;
    await Transaction.create({
      userId,
      invoiceNo,
      paymentMethod,
      paymentProof: fileName, 
      paymentStatus,
    });
    res.status(200).json({ message: 'Bukti bayar berhasil diupload' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengupload bukti bayar' });
  }
};

module.exports = {
  uploadPaymentProofController,
};
