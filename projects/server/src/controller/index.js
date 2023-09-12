// controllers/auth/index.js
const { registerUser } = require('./auth/register') // Import the register.js controller
const { login } = require('./auth/login')
const { verifyUser } = require('./auth/verify')
const { getAllCategory } = require('./product/category')

module.exports = {
  registerUser, // Export the register controller
  login,
  verifyUser,
  getAllCategory
}
