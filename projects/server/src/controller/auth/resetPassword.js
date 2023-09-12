//controller/auth/resetPassword.js
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../../models')
const User = db.User
const { validationResult } = require('express-validator')
const verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY)

const findUserById = async (id) => await User.findOne({ where: { id } })

const hashPassword = async (password) => await bcrypt.hash(password, 10)

const updateUserPassword = async (hashedPassword, id) => {
  return await User.update({ password: hashedPassword }, { where: { id } })
}

const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const token = req.headers.authorization.split(' ')[1]
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }
    const decoded = verifyToken(token)
    const user = await findUserById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const hashedPassword = await hashPassword(password)
    await updateUserPassword(hashedPassword, decoded.id)
    res.status(200).json('Password has been reset')
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = resetPassword
