const db = require("../../../models")
const warehouse = db.Warehouse

const deleteWarehouse = async (id) => {
  try {
    const existingWarehouse = await warehouse.findByPk(id);
    if (!existingWarehouse) {
      return { success: false, message: 'Gudang tidak ditemukan' };
    }
    await existingWarehouse.destroy();
    return { success: true, message: 'Gudang berhasil dihapus' };
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan saat menghapus gudang: ' + error.message };
  }
}

module.exports = deleteWarehouse;