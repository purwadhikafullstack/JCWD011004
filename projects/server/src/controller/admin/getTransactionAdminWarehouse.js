const db = require('../../../models')
const Transaction = db.Transaction
const Product = db.Product
const Warehouse_Admin = db.Warehouse_Admin
const Warehouse = db.Warehouse
const Transaction_Item = db.Transaction_Item
const User = db.User

const getAllTransactionAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const { transactionStatusId } = req.query // Ambil parameter transactionStatusId dari query string

    const warehouseAdmin = await Warehouse_Admin.findOne({
      where: { adminId: id }
    })

    if (!warehouseAdmin) {
      return res
        .status(403)
        .json({ message: 'Anda tidak memiliki izin akses ke gudang.' })
    }

    const whereCondition = {
      warehouseId: warehouseAdmin.warehouseId
    }

    if (transactionStatusId) {
      // Jika transactionStatusId disertakan dalam query string, tambahkan filter berdasarkan transactionStatusId
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
    return res.status(500).json({ message: error.message })
  }
}

module.exports = getAllTransactionAdmin
