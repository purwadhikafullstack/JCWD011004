const jwt = require('jsonwebtoken')
const db = require('../../../models')
const User = db.User
const { sendEmail } = require('../../helpers/emailRegister') // Import the sendEmail function

async function findExistingUser(email) {
  return await User.findOne({ where: { email } })
}

async function createNewUser(email) {
  return await User.create({
    email,
    roleId: 3,
    isVerified: false
  })
}

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '1h' })
}

async function registerUser(req, res) {
  try {
    const { email } = req.body
    const existingUser = await findExistingUser(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' })
    }
    const newUser = await createNewUser(email)
    const token = generateToken(newUser.id)
    const emailResponse = await sendEmail(email, token)
    if (emailResponse.status === 500) {
      throw new Error(emailResponse.message)
    }
    res.status(200).json({ message: emailResponse.message })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' })
  }
}

module.exports = {
  registerUser
}
