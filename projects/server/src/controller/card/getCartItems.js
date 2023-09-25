const db = require('../../../models')
const Cart_Item = db.Cart_Item
const Cart = db.Cart
const Product = db.Product
const jwt = require('jsonwebtoken')

async function getCartItems(req, res) {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const { id: userId } = decoded
    let cart = await Cart.findOne({ where: { userId } })
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    let cartItems = await Cart_Item.findAll({
      where: {
        cartId: cart.id
      },
      include: Product // Include product details
    })
    res.status(200).json(cartItems)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function getCartItemsSortPagination(req, res) {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const { id: userId } = decoded
    const page = parseInt(req.query.page) || 1
    const size = parseInt(req.query.size) || 10
    const sort = req.query.sort || 'newest'
    let order
    switch (sort) {
      case 'newest':
        order = [['createdAt', 'DESC']]
        break
      case 'oldest':
        order = [['createdAt', 'ASC']]
        break
      case 'price':
        order = [['totalPrice', 'DESC']]
        break
      default:
        order = [['createdAt', 'DESC']]
    }
    let cart = await Cart.findOne({ where: { userId } })
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    let cartItems = await Cart_Item.findAll({
      where: {
        cartId: cart.id
      },
      include: Product,
      limit: size,
      offset: (page - 1) * size,
      order
    })

    res.status(200).json(cartItems)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getCartItems,
  getCartItemsSortPagination
}
