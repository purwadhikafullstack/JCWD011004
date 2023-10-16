const db = require('../../../../models');
const StockJournal = db.StockJournal;
const Warehouse_Product = db.Warehouse_Product;
const Warehouse_Admin = db.Warehouse_Admin;
const Warehouse = db.Warehouse;
const Product = db.Product;

const getAllStockWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouseAdmin = await Warehouse_Admin.findOne({
      where: { adminId: id }
    });

    if (!warehouseAdmin) {
      return res.status(403).json({ message: 'Anda tidak memiliki izin akses ke gudang.' });
    }

    const warehouseId = warehouseAdmin.warehouseId; 

    const whereClause = warehouseId ? { WarehouseId: warehouseId } : {};
    const warehouseProducts = await Warehouse_Product.findAll({
      include: [{ model: Product }, { model: Warehouse }],
      where: whereClause
    });

    return res.status(200).json(warehouseProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getAllStockWarehouse
