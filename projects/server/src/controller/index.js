// controllers/auth/index.js
const { registerUser } = require('./auth/register') 
const { login } = require('./auth/login')
const { getAllProduct, mostSales } = require('./product/getProduct')

module.exports = {
  registerUser,
  login,
  getAllProduct,
  mostSales
}
