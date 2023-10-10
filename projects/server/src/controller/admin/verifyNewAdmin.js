//controller/auth/resetPassword.js
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../../models')
const User = db.User

const verifyAdminAccount = async (req, res) => {
  try {
    const { token } = req.params
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' })
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    console.log(decoded)
    const user = await User.findOne({ where: { id: decoded.userId } })
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.isVerified = 1 // Set isVerified to true
    user.isActive = 1 // Set isActive to true
    await user.save()

    res.status(200).json({ message: 'Password updated successfully.' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

module.exports = { verifyAdminAccount }
