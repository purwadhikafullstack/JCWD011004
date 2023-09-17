// controllers/auth/index.js
const { registerUser } = require('./auth/register') // Import the register.js controller
const { login } = require('./auth/login')
const { getAllProduct, mostSales } = require('./product/getProduct')
const {seeDetailProduct} = require('./product/seeDetailProduct')
const { addItem, removeItem } = require('./card/addingItem')

module.exports = {
  registerUser, 
  login,
  getAllProduct,
  mostSales,
  seeDetailProduct,
  addItem,
  removeItem
}
