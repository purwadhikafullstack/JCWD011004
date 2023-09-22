const db = require('../../models');
const Transaction = db.Transaction;
const Transaction_Status = db.Transaction_Status;
const sequelize = db.sequelize;

async function uploadPaymentProof(id, file) {
  const t = await sequelize.transaction();
  try {
    const { path } = file;
    await Transaction.update(
      { paymentProof: path, paymentStatus: true, transactionStatus: Transaction_Status.code[1]}, 
      { where: { id }, transaction: t }
    );
    await t.commit();  
    return 'Bukti pembayaran berhasil diunggah dan status diperbarui.';
  } catch (error) {
    await t.rollback();
    throw new Error('Gagal mengunggah bukti pembayaran: ' + error.message);
  }
}
module.exports = {
  uploadPaymentProof,
};
