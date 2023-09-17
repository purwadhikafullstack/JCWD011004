const db = require('../../../models');
const Cart_Item = db.Cart_Item;

async function addItem(req, res) {
  try {
    const { cartId, productId, quantity, totalPrice } = req.body;
    let cartItem = await Cart_Item.findOne({
      where: {
        cartId,
        productId,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.totalPrice += quantity * totalPrice;
      await cartItem.save();
    } else {
      cartItem = await Cart_Item.create({
        cartId,
        productId,
        quantity,
        totalPrice,
      });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function removeItem(req, res) {
    try {
      const { cartId, quantity, totalPrice } = req.body;
      const itemCart = await Cart_Item.findByPk(cartId);
  
      if (!itemCart) {
        return res.status(404).json({ error: 'Item tidak ditemukan di keranjang' });
      }
  
      if (itemCart.quantity <= quantity) {
        await itemCart.destroy();
      } else {
        itemCart.quantity -= quantity;
        itemCart.totalPrice -= quantity * totalPrice;
        await itemCart.save();
      }
  
      res.status(200).json({ message: 'Item berhasil dihapus dari keranjang' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus item dari keranjang' });
    }
  }


module.exports = {
    addItem,
    removeItem
}