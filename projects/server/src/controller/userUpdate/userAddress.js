const db = require('../../../models')
const addressdb = db.Address

const userAddress = {
  addAddress: async (req, res) => {
    try {
      const {
        name,
        phone,
        address,
        province,
        cityRegency,
        subdistrict,
        postalCode,
        cityId,
        longitude,
        latitude
      } = req.body

      const { id } = req.userData

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
            postalCode,
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

module.exports = userAddress
