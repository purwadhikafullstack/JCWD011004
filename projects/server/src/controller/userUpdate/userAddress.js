const { adminService } = require('../services')
const db = require('../models')
const users = db.User

const USerAddress = {
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
        cityId
      } = req.body
      await adminService.updateSalary(employeeId, monthlySalary)
      return res.status(200).json({
        success: 'Update salary succeed',
        user: { employeeId, monthlySalary }
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Update salary failed',
        message: err.message
      })
    }
  }
}

module.exports = USerAddress
