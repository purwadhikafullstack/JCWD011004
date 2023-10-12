const db = require('../../../models')
const User = db.User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function login(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'Email tidak ditemukan' })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'User is not active' })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if (!isPassword) {
      return res.status(404).json({ message: 'Password tidak sesuai' })
    }

    const payload = { id: user.id, role: user.roleId, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' }) // jangan lupa ganti
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
