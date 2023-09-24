const db = require('../../models')
const Transaction = db.Transaction
const Transaction_Status = db.Transaction_Status
const sequelize = db.sequelize

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
      { paymentProof: path, transactionStatusId: newTransactionStatus.code },
      { where: { id }, transaction: t }
    )
    await t.commit()
    return 'Bukti pembayaran berhasil diunggah dan status diperbarui.'
  } catch (error) {
    await t.rollback()
    throw new Error('Gagal mengunggah bukti pembayaran: ' + error.message)
  }
}
module.exports = {
  uploadPaymentProof
}
