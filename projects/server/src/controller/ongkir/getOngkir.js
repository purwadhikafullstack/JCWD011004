const db = require('../../../models')
// const Warehouse = db.Warehouse
const addressdb = db.Address

const userOngkir = {
  productOngkir: async (req, res) => {
    try {
      //   const { userCityId, warehouseCityId, weight, courier } = req.body

      const { id } = req.userData

      //   const warehouses = await Warehouse.findAll()

      await db.sequelize.transaction(async (t) => {
        const userData = await addressdb.create(
          {
            userId: id,
            name,
            phone,
            address,
            province,
            cityRegency,
            subdistrict,
            postalcode,
            cityId,
            longitude,
            latitude
          },
          { transaction: t }
        )
        return res.status(200).json({
          success: 'Add address succeed',
          userData
        })
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Add address failed',
        message: err.message
      })
    }
  }
}

module.exports = userOngkir
