// routes/index.js
const authRouter = require('./authRouter')
const userUpdate = require('./userUpdate')
const productRouter = require('./productRouter')
const cart = require('./cart')

module.exports = {
  authRouter,
  userUpdate,
  productRouter,
  cart
}
