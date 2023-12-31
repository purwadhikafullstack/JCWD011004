const db = require("../../../models");
const Transaction = db.Transaction;
const Transaction_Item = db.Transaction_Item;
const { Op } = require("sequelize");

const getAllOrderStatus = async (req, res) => {
  try {
    const userId = req.query.userId
    const transactionStatusId = req.query.transactionStatusId

    let whereClause = {}

    if (userId !== undefined) {
      whereClause.userId = userId
    }

    if (transactionStatusId !== undefined) {
      whereClause.transactionStatusId = {
        [Op.eq]: transactionStatusId
      }
    }

    const allOrderStatus = await Transaction.findAll({
      where: whereClause,
      include: [
        { model: db.Product },
        { model: Transaction_Item, include: [{ model: db.Product }] }
      ]
    })

    res.status(200).json({
      allOrderStatus
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  getAllOrderStatus
}
