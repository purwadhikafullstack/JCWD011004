const db = require('../../../models')
const Transaction = db.Transaction
const { Op } = require('sequelize')

const transactionStatus = {
  updateStatus: async (req, res) => {
    try {
      const transactionId = parseInt(req.params.transactionId)
      const { transactionStatusId } = req.body
      const transaction = await db.sequelize.transaction(async (t) => {
        const transactionData = await Transaction.update(
          {
            transactionStatusId
          },
          {
            where: { id: transactionId },
            transaction: t
          }
        )
        return transactionData
      })

      return res.status(200).json({
        success: 'Update transaction status succeed',
        transaction
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Update transaction status failed',
        message: err.message
      })
    }
  },

  updateAllByRangeTime: async (req, res) => {
    try {
      const { transactionStatusId, updateTransactionStatusId, rangeTime } =
        req.body
      const transaction = await db.sequelize.transaction(async (t) => {
        const secondsData = new Date()
        secondsData.setSeconds(secondsData.getSeconds() - rangeTime)

        const response = await Transaction.update(
          { transactionStatusId: updateTransactionStatusId },
          {
            where: {
              updatedAt: { [Op.lt]: secondsData },
              transactionStatusId: transactionStatusId
            },
            transaction: t
          }
        )
        return response
      })

      return res.status(200).json({
        success: 'Update all transaction status succeed',
        transaction
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Update all transaction status failed',
        message: err.message
      })
    }
  }
}

module.exports = transactionStatus
