// controllers/auth/index.js
const { registerUser } = require('./auth/register')
const { login } = require('./auth/login')
const { getAllCategory } = require('./product/category')
const { getAllProduct, mostSales } = require('./product/getProduct')
const { seeDetailProduct } = require('./product/seeDetailProduct')
const { verifyUser } = require('./auth/verify')
const { getUserInfo } = require('./auth/keepLogin')
const requestResetPassword = require('./auth/requestResetPassword')
const { firebaseLogin, firebaseRegister } = require('./auth/firebaseLogin')
const resetPassword = require('./auth/resetPassword')
const { addItem, removeItem } = require('./card/addingItems')
module.exports = {
  registerUser,
  login,
  getAllCategory,
  getAllProduct,
  mostSales,
  verifyUser,
  getUserInfo,
  requestResetPassword,
  resetPassword,
  seeDetailProduct,
  firebaseLogin,
  firebaseRegister,
  addItem,
  removeItem
}
