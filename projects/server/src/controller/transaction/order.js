const { default: axios } = require('axios')
// const db = require('../../../models')
// const Warehouse = db.Warehouse

const userOrder = {
  createOrder: async (req, res) => {
    try {
      //   const { userCityId, userLatitude, userLongitude, courier, weight } =
      //     req.body

      //   const warehouses = await Warehouse.findAll()

      const { data } = await axios.post(
        'https://api.rajaongkir.com/starter/cost',
        {
          origin: nearestWarehouse.cityId,
          destination: userCityId,
          weight: weight,
          courier: courier
        },
        {
          headers: {
            Key: process.env.KEY_RAJAONGKIR
          }
        }
      )
      return res.status(200).json({
        success: 'Get courier succeed',
        courier: data.rajaongkir
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Get courier failed',
        message: err.message
      })
    }
  }
}

module.exports = userOrder
