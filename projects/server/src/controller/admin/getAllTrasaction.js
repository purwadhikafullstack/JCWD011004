const db = require('../../../models')
const Transaction = db.Transaction
const Product = db.Product
const Transaction_Item = db.Transaction_Item
const Warehouse = db.Warehouse
const User = db.User

const getAllTransaction = async (req, res) => {
  try {
    const { warehouseId, transactionStatusId } = req.query
    const whereCondition = {}

    if (warehouseId) {
      whereCondition.warehouseId = warehouseId
    }
    console.log(warehouseId)

    if (transactionStatusId) {
      whereCondition.transactionStatusId = transactionStatusId
    }

    const allTransaction = await Transaction.findAll({
      where: whereCondition,
      include: [
        { model: Warehouse },
        { model: Transaction_Item, include: Product },
        { model: User }
      ]
    })

    return res.status(200).json({ allTransaction })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'An error occurred' })
  }
}

module.exports = getAllTransaction
