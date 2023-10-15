const db = require('../../../models')
const Transaction = db.Transaction

const rejectPayment = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id }
    })
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    transaction.transactionStatusId = 0
    await transaction.save()

    res.json({ message: 'Payment rejected successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  rejectPayment
}
