// controllers/auth/index.js
const { registerUser } = require('./auth/register')
const { login } = require('./auth/login')
const { getAllCategory } = require('./product/category')
const { getAllProduct, mostSales } = require('./product/getProduct')
const { verifyUser } = require('./auth/verify')

module.exports = {
  registerUser,
  login,
  getAllCategory,
  getAllProduct,
  mostSales,
  verifyUser
}
