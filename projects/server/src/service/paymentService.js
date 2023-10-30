const db = require('../../models')
const Transaction = db.Transaction
const Transaction_Status = db.Transaction_Status
const sequelize = db.sequelize
const serverBaseURL = process.env.SERVER_BASE_URL || 'http://localhost:8000'
const path = require('path')
async function uploadPaymentProof(id, file) {
  const t = await sequelize.transaction()
  try {
    const { path } = file
    const newTransactionStatus = await Transaction_Status.findOne({
      where: { name: 'Menunggu Konfirmasi Pembayaran' }
    })
    if (!newTransactionStatus) {
      throw new Error('Status transaksi tidak ditemukan.')
    }
    await Transaction.update(
      { paymentProof: `uploads/${file?.filename}`, transactionStatusId: newTransactionStatus.code },
      { where: { id }, transaction: t }
    )
    await t.commit()
    return 'Bukti pembayaran berhasil diunggah dan status diperbarui.'
  } catch (error) {
    await t.rollback()
    throw new Error('Gagal mengunggah bukti pembayaran: ' + error.message)
  }
}
async function getPaymentProofImage(req, res) {
  try {
    const transactionId = req.params.transactionId
    const transaction = await Transaction.findByPk(transactionId)
    if (!transaction) {
      return res.status(400).json({ message: 'Transaction not found.' })
    }
    const imagePath = transaction.paymentProof.replace('public\\', '')
    const imageURL = `${serverBaseURL}/${imagePath}`
    return res.status(200).json({ message: 'Success', imageURL })
  } catch (error) {
    console.error('Failed to retrieve payment proof image: ', error.message)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
module.exports = {
  uploadPaymentProof,
  getPaymentProofImage
}
