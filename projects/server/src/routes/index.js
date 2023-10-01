// routes/index.js
const authRouter = require('./authRouter')
const userUpdate = require('./userUpdate')
const productRouter = require('./productRouter')
const paymentRouter = require('./paymentRouter')
const transactionRouter = require('./transactionRouter')
const cardRouter = require('./cardRouter')
const externalRouter = require('./externalRouter')
const cart = require('./cart')
const warehouseRoute = require('./warehouseRoute')

module.exports = {
  authRouter,
  userUpdate,
  productRouter,
  cardRouter,
  externalRouter,
  paymentRouter,
  transactionRouter,
  cardRouter,
  cart,
  warehouseRoute
}
