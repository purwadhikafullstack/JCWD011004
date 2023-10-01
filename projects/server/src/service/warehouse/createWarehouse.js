const db = require('../../../models')
const warehouse = db.Warehouse
const messages = require('../../helpers/message')
const getLatLongFromAddress = require('../../helpers/addressCoordinate')
const sequelize = db.sequelize

const createWarehouse = async (body) => {
  try {
    const { latitude, longitude } = await getLatLongFromAddress(
      body.province,
      body.cityRegency
    )

    const result = await sequelize.transaction(async (t) => {
      const newWarehouse = await warehouse.create(
        {
          name: body.name,
          address: body.address,
          province: body.province,
          cityRegency: body.cityRegency,
          postalcode: body.postalcode,
          latitude,
          longitude
        },
        { transaction: t }
      )
      return messages.success('successfully created warehouse', newWarehouse)
    })

    return result
  } catch (error) {
    console.error(error)
    return messages.error(500, error.message)
  }
}

module.exports = createWarehouse
