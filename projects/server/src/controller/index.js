// controllers/auth/index.js
const { registerUser } = require('./auth/register') 
const { login } = require('./auth/login')
const { getAllCategory } = require('./product/category')
const { getAllProduct, mostSales } = require('./product/getProduct')
const { seeDetailProduct } = require('./product/seeDetailProduct')

module.exports = {
  registerUser,
  login,
  getAllCategory,
  getAllProduct,
  mostSales,
  seeDetailProduct
}
