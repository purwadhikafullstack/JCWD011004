const db = require('../../../models')
const User = db.User
const Warehouse_Admin = db.Warehouse_Admin

async function updateWarehouseAdmin(req, res) {
  try {
    const {
      userId,
      warehouseId,
      email,
      firstName,
      lastName,
      phoneNumber,
      isActive
    } = req.body

    if (!userId) {
      return res.status(400).send({ message: 'User ID is required' })
    }

    const user = await User.findOne({ where: { id: userId } })

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    if (email) user.email = email
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (isActive !== undefined) user.isActive = isActive

    await user.save()

    // Update warehouse admin
    if (warehouseId) {
      const warehouseAdmin = await Warehouse_Admin.findOne({
        where: { adminId: userId }
      })

      if (!warehouseAdmin) {
        return res.status(404).send({ message: 'Warehouse admin not found' })
      }

      warehouseAdmin.warehouseId = warehouseId

      await warehouseAdmin.save()
    }

    return res
      .status(200)
      .send({ message: 'Warehouse admin updated successfully', user })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Something went wrong' })
  }
}

module.exports = updateWarehouseAdmin
