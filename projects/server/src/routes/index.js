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
const adminRouter = require('./adminRouter')
const ongkirRouter = require('./ongkirRouter')
const stockRouter = require('./stockRouter')
const historyRouter = require('./historyRouter')
const categoryRouter = require('./categoryRouter')

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
  warehouseRoute,
  adminRouter,
  ongkirRouter,
  stockRouter,
  historyRouter,
  categoryRouter
}
