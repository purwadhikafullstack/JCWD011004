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
        postalcode,
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
  },

  updateAddress: async (req, res) => {
    try {
      const {
        addressId,
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
        await addressdb.update(
          {
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
          { where: { id: addressId, userId: id } },
          { transaction: t }
        )
        return res.status(200).json({
          success: 'Update address succeed',
          userData: {
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
          }
        })
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Update address failed',
        message: err.message
      })
    }
  },

  getAddress: async (req, res) => {
    try {
      const { id } = req.userData
      const userData = await addressdb.findAll({ where: { userId: id } })
      return res.status(200).json({
        success: 'Get address succeed',
        userData
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Get address failed',
        message: err.message
      })
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const { id } = req.params
      const userData = await addressdb.destroy({
        where: {
          id
        }
      })
      return res.status(200).json({
        success: 'Delete address succeed',
        userData
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Delete address failed',
        message: err.message
      })
    }
  }
}

module.exports = userAddress
