// routes/index.js
const authRouter = require('./authRouter')
const productRouter = require('./productRouter')
const register = require('./register')

module.exports = {
  authRouter,
  productRouter,
  register
}
