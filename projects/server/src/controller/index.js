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
const getAllTrasaction = require('./admin/getAllTrasaction')
const updateWarehouseAdmin = require('./admin/updateAdmin')
const {
  getAllStock,
  createStockJournal,
  getStockJournalsByProduct,
  getStockByProductAndWarehouse
} = require('./stock/AdminSuper/stock')
const getAllStockWarehouse = require('./stock/AdminWarehouse/stockWarehouse')
const { courierOngkir } = require('./ongkir/getOngkir')
const { createOrder } = require('./transaction/order')
const { updateStatus } = require('./transaction/transactionStatus')
const getAllTransactionAdmin = require('./admin/getTransactionAdminWarehouse')
const { getAdminInfo } = require('./admin/adminKeepLogin')
const { updateAllByRangeTime } = require('./transaction/transactionStatus')
const { rejectPayment } = require('./transaction/confirmationPayment')
const { updatePaymentStatus } = require('./transaction/mutationAndConfirmation')
const { getSalesReport } = require('./report/sales')
const {
  addCategory,
  updateCategory,
  deleteCategory
} = require('./category/category')
const {
  addProduct,
  updateProduct,
  uploadImage,
  deleteImage
} = require('./product/addProduct')
const {
  addWarehouseProduct,
  deleteWarehouseProduct
} = require('./product/warehouseProduct')
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
  updateWarehouseAdmin,
  getAllTrasaction,
  getAllStock,
  createStockJournal,
  getStockJournalsByProduct,
  getStockByProductAndWarehouse,
  getAllStockWarehouse,
  courierOngkir,
  createOrder,
  getAllTransactionAdmin,
  getAdminInfo,
  updateStatus,
  updateAllByRangeTime,
  rejectPayment,
  updatePaymentStatus,
  addWarehouseProduct,
  deleteWarehouseProduct,
  addProduct,
  updateProduct,
  uploadImage,
  deleteImage,
  addCategory,
  updateCategory,
  deleteCategory,
  getSalesReport
}
