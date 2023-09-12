// controllers/auth/index.js
const { registerUser } = require('./register') // Import the register.js controller
const requestResetPassword = require('./requestResetPassword')
const resetPassword = require('./resetPassword')

module.exports = {
  registerUser, // Export the register controller
  requestResetPassword,
  resetPassword
}
