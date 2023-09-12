// controllers/auth/index.js
const { registerUser } = require('./register') // Import the register.js controller
const { login } = require('./login')

module.exports = {
  registerUser, // Export the register controller
  login
}
