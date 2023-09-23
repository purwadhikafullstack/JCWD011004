// routes/index.js
const authRouter = require('./authRouter')
const userUpdate = require('./userUpdate')
const productRouter = require('./productRouter')
const paymentRouter = require('./paymentRouter')

module.exports = {
  authRouter,
  userUpdate,
  productRouter,
  paymentRouter
}
