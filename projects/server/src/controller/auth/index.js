// controllers/auth/index.js
const { registerUser } = require('./register') // Import the register.js controller
const requestResetPassword = require('./requestResetPassword')
const resetPassword = require('./resetPassword')
const { login } = require('./login')

module.exports = {
  login,
  registerUser,
  requestResetPassword,
  resetPassword
}
