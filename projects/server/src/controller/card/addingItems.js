const db = require('../../../models')
const Cart_Item = db.Cart_Item
const Cart = db.Cart
const Product = db.Product
const jwt = require('jsonwebtoken')

async function addItem(req, res) {
  try {
    let { productId, quantity } = req.body
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const { id: userId } = decoded
    if (!quantity) {
      quantity = 1
    }
    const product = await Product.findOne({ where: { id: productId } })
    const pricePerItem = product.price
    const totalPrice = quantity * pricePerItem
    let cart = await Cart.findOne({ where: { userId } })
    if (!cart) {
      cart = await Cart.create({ userId })
    }
    let cartItem = await Cart_Item.findOne({
      where: {
        cartId: cart.id,
        productId
      }
    })

    // Jika item sudah ada di keranjang, tambahkan kuantitasnya
    if (cartItem) {
      cartItem.quantity += quantity
      cartItem.totalPrice += totalPrice
      await cartItem.save()
    } else {
      // Jika item belum ada di keranjang, tambahkan item ke keranjang
      cartItem = await Cart_Item.create({
        cartId: cart.id,
        productId,
        quantity,
        totalPrice
      })
    }

    res.status(200).json(cartItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function removeItem(req, res) {
  try {
    const { cartId, quantity, totalPrice } = req.body
    const itemCart = await Cart_Item.findByPk(cartId)
    if (!itemCart) {
      return res
        .status(404)
        .json({ error: 'Item tidak ditemukan di keranjang' })
    }

    if (itemCart.quantity <= quantity) {
      await itemCart.destroy()
    } else {
      itemCart.quantity -= quantity
      itemCart.totalPrice -= quantity * totalPrice
      await itemCart.save()
    }

    res.status(200).json({ message: 'Item berhasil dihapus dari keranjang' })
  } catch (error) {
    console.error('Error:', error)
    res
      .status(500)
      .json({ error: 'Terjadi kesalahan saat menghapus item dari keranjang' })
  }
}

module.exports = {
  addItem,
  removeItem
}
