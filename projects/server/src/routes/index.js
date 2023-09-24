// routes/index.js
const authRouter = require('./authRouter')
const userUpdate = require('./userUpdate')
const productRouter = require('./productRouter')
const cardRouter = require('./cardRouter')

module.exports = {
  authRouter,
  userUpdate,
  productRouter,
  cardRouter
}
