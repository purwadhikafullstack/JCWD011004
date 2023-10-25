const db = require('../../../models')
const User = db.User
const Warehouse_Admin = db.Warehouse_Admin
const Warehouse = db.Warehouse
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function login(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({
      include: [
        {
          model: Warehouse_Admin,
          include: [{ model: Warehouse }]
        }
      ],
      where: {
        email: email
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Email tidak ditemukan' })
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'User is not active' })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if (!isPassword) {
      return res.status(404).json({ message: 'Password tidak sesuai' })
    }

    const payload = {
      id: user.id,
      role: user.roleId,
      email: user.email
    }

    if (user?.Warehouse_Admins && user?.Warehouse_Admins[0]?.warehouseId) {
      payload.warehouseId = user.Warehouse_Admins[0].warehouseId
      payload.warehouseName = user.Warehouse_Admins[0].Warehouse.name
    }

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '3h' })
    return res
      .status(200)
      .json({ message: 'Login Berhasil', token, role: user.roleId })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  login
}
