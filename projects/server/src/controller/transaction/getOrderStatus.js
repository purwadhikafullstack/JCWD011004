const db = require("../../../models");
const Transaction = db.Transaction;

const getAllOrderStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const allOrderStatus = await Transaction.findAll({
      where: {
        userId
      },
      include: [{ model: db.Transaction_Status, as: 'statusTransaction' }],
    });

    if (!allOrderStatus || allOrderStatus.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    res.status(200).json({
      allOrderStatus,
    });
  } catch (error) {
    console.error(error); // Menggunakan console.error untuk log error
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllOrderStatus,
};
