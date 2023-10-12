// controllers/auth/index.js
const { registerUser } = require('./auth/register')
const { login } = require('./auth/login')
const { getAllCategory } = require('./product/category')
const { getAllProduct, mostSales } = require('./product/getProduct')
const { seeDetailProduct } = require('./product/seeDetailProduct')
const { verifyUser } = require('./auth/verify')
const { getUserInfo } = require('./auth/keepLogin')
const { uploadReceipt } = require('./payment/uploadReceipt')
const requestResetPassword = require('./auth/requestResetPassword')
const { firebaseLogin, firebaseRegister } = require('./auth/firebaseLogin')
const resetPassword = require('./auth/resetPassword')
const {
  getCartItems,
  getCartItemsSortPagination
} = require('./cart/getCartItems')
const {
  addAddress,
  updateAddress,
  getAddress,
  deleteAddress
} = require('./userUpdate/userAddress')
const { province, cityRegency } = require('./external/rajaongkir')
const { longlat } = require('./external/opencage')
const { getAllOrderStatus } = require('./transaction/getOrderStatus')
const { addItem, removeItem, updateItem } = require('./cart/addingItems')
const {
  createWarehouses,
  updateWarehouses,
  deleteWarehouses,
  getWarehouses
} = require('./warehouse/warehouseController')
const { getUsersSortPagination } = require('./admin/getUserData')
const getWarehouse = require('./admin/getWarehouses')
const { createWarehouseAdmin } = require('./admin/createAdmin')
const { verifyAdminAccount } = require('./admin/verifyNewAdmin')
const  getAllTrasaction  = require('./admin/getAllTrasaction')
const getAllTransactionAdmin = require('./admin/getTransactionAdminWarehouse')
const { productOngkir } = require('./ongkir/getOngkir')
const updateWarehouseAdmin = require('./admin/updateAdmin')
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
  uploadReceipt,
  seeDetailProduct,
  addItem,
  removeItem,
  firebaseLogin,
  firebaseRegister,
  addAddress,
  updateAddress,
  getAddress,
  deleteAddress,
  province,
  cityRegency,
  longlat,
  seeDetailProduct,
  uploadReceipt,
  getAllOrderStatus,
  addItem,
  removeItem,
  getCartItems,
  getCartItemsSortPagination,
  updateItem,
  createWarehouses,
  updateWarehouses,
  deleteWarehouses,
  getWarehouse,
  getUsersSortPagination,
  getWarehouses,
  createWarehouseAdmin,
  verifyAdminAccount,
  productOngkir,
  updateWarehouseAdmin,
  getAllTrasaction,
  getAllTransactionAdmin
}
