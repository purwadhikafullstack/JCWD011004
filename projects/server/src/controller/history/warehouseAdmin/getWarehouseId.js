const db = require('../../../../models')
const Warehouse_Admin = db.Warehouse_Admin
const Warehouse = db.Warehouse

const getWarehouseId = async (req, res) => {
  try {
    const { userId } = req.params
    const warehouseAdmin = await Warehouse_Admin.findOne({
      where: { adminId: userId }
    })

    if (!warehouseAdmin) {
      return res
        .status(403)
        .json({ message: 'Anda tidak memiliki izin akses ke gudang.' })
    }

    // Jika ada admin gudang, cari gudang yang terkait dengannya
    const warehouseId = warehouseAdmin.warehouseId // Ini diasumsikan ada relasi atau kunci asing yang menghubungkan Warehouse_Admin dan Warehouse

    const warehouse = await Warehouse.findByPk(warehouseId)

    if (!warehouse) {
      return res.status(404).json({ message: 'Gudang tidak ditemukan.' })
    }

    return res.status(200).json([warehouse])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Terjadi kesalahan server.' })
  }
}

module.exports = getWarehouseId
