// routes/index.js
const authRouter = require('./authRouter')
const userUpdate = require('./userUpdate')
const productRouter = require('./productRouter')

module.exports = {
  authRouter,
  userUpdate,
  productRouter
}
