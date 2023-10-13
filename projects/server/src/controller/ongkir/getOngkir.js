const { default: axios } = require('axios')
const db = require('../../../models')
const Warehouse = db.Warehouse

const userOngkir = {
  courierOngkir: async (req, res) => {
    try {
      const { userCityId, userLatitude, userLongitude, courier, weight } =
        req.body

      function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371
        const lat1Rad = (lat1 * Math.PI) / 180
        const lon1Rad = (lon1 * Math.PI) / 180
        const lat2Rad = (lat2 * Math.PI) / 180
        const lon2Rad = (lon2 * Math.PI) / 180
        const dlat = lat2Rad - lat1Rad
        const dlon = lon2Rad - lon1Rad
        const a =
          Math.sin(dlat / 2) ** 2 +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c
        return distance
      }

      function findNearestWarehouse(warehouses, lat, lng) {
        let nearestWarehouse = null
        let shortestDistance = Number.MAX_VALUE

        warehouses.forEach((warehouse) => {
          const distance = haversineDistance(
            lat,
            lng,
            parseFloat(warehouse.latitude),
            parseFloat(warehouse.longitude)
          )
          if (distance < shortestDistance) {
            shortestDistance = distance
            nearestWarehouse = warehouse
          }
        })

        return nearestWarehouse
      }

      const warehouses = await Warehouse.findAll()

      const nearestWarehouse = findNearestWarehouse(
        warehouses,
        userLatitude,
        userLongitude
      )
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

module.exports = userOngkir
