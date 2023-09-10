// controllers/auth/index.js
const { registerUser } = require('./auth/register') // Import the register.js controller
const { login } = require('./auth/login')
const { getAllProduct, getMostSales } = require('./product/getProduct')

module.exports = {
  registerUser, // Export the register controller
  login,
  getAllProduct,
  getMostSales
}
