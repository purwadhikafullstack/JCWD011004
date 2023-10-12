const db = require('../../../models');
const Transaction = db.Transaction;
const Product = db.Product;
const Warehouse = db.Warehouse;

const getAllTransaction = async (req, res) => {
  try {
    const { warehouseId } = req.query;
    const whereCondition = warehouseId ? { warehouseId } : {};

    const allTransaction = await Transaction.findAll({
      where: whereCondition,
      include: [
        { model: Product },
        { model: Warehouse }
      ]
    });

    return res.status(200).json({ allTransaction });
  } catch (error) {
    console.log(error);
  }
}

module.exports = getAllTransaction;
