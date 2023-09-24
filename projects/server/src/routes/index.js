// routes/index.js
const authRouter = require('./authRouter')
const userUpdate = require('./userUpdate')
const productRouter = require('./productRouter')
const paymentRouter = require('./paymentRouter')
const transactionRouter = require('./transactionRouter')
const cardRouter = require('./cardRouter')

module.exports = {
  authRouter,
  userUpdate,
  productRouter,
  paymentRouter,
  transactionRouter,
  cardRouter
}
