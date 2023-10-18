const db = require('../../../../models');
const StockJournal = db.StockJournal;
const Warehouse = db.Warehouse;

const getStockHistoryByProduct = async (req, res) => {
  try {
    const { warehouseProductId } = req.params;
    const stockHistory = await StockJournal.findOne({
      where: { warehouseProductId },
      include: [{ model: Warehouse }],
    });

    if (stockHistory) {
      const warehouseName = stockHistory.Warehouse.name;
      return res.status(200).json({ stockHistory, warehouseName });
    } else {
      return res.status(404).json({ message: 'Stock history not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getStockHistoryByProduct;
