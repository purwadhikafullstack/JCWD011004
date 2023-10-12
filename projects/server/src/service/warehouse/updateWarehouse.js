const db = require('../../../models')
const warehouse = db.Warehouse
const messages = require('../../helpers/message')
const getLatLongFromAddress = require('../../helpers/addressCoordinate')
const sequelize = db.sequelize

const updateWarehouse = async (id, body) => {
  try {
    const existingWarehouse = await warehouse.findOne({
      where: { id: id },
    })
    if (!existingWarehouse) {
      return messages.error(404, 'Gudang tidak ditemukan')
    }
    const { latitude, longitude } = await getLatLongFromAddress(
      body.province,
      body.cityRegency
    )
    const updateWarehouse = await sequelize.transaction(async (t) => {
      await existingWarehouse.update({
        name: body.name,
        address: body.address,
        province: body.province,
        cityRegency: body.cityRegency,
        postalcode: body.postalcode,
        latitude,
        longitude,
      }, { transaction: t })
      return existingWarehouse
    })
    return messages.success('Gudang berhasil diperbarui', updateWarehouse)
  } catch (error) {
    return messages.error(500, error.message);
  }
}

module.exports = updateWarehouse