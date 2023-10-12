const db = require('../../../models')
const Transaction = db.Transaction
const Product = db.Product
const Warehouse_Admin = db.Warehouse_Admin
const Warehouse = db.Warehouse
const Transaction_Item = db.Transaction_Item

const getAllTransactionAdmin = async (req, res) => {
  try {
    const { userId } = req.body
    console.log(userId)
    const warehouseAdmin = await Warehouse_Admin.findOne({
      where: { adminId: userId }
    })

    if (!warehouseAdmin) {
      return res
        .status(403)
        .json({ message: 'Anda tidak memiliki izin akses ke gudang.' })
    }

    const allTransaction = await Transaction.findAll({
      where: { warehouseId: warehouseAdmin.warehouseId },
      include: [
        { model: Warehouse },
        {model: Transaction_Item, include: Product}]
    })

    return res.status(200).json({ allTransaction })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = getAllTransactionAdmin
