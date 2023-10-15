const db = require('../../../models')
const Transaction = db.Transaction
const CartItem = db.Cart_Item
const Cart = db.Cart
const TransactionItem = db.Transaction_Item
const { Op } = require('sequelize')

const userOrder = {
  createOrder: async (req, res) => {
    try {
      const { id } = req.userData
      const {
        warehouseId,
        totalItemPrice,
        shippingCost,
        totalPrice,
        shippingAddress,
        paymentMethod,
        paymentProof,
        checkedProductId
      } = req.body

      const transaction = await db.sequelize.transaction(async (t) => {
        const transactionResponse = await Transaction.create(
          {
            userId: id,
            warehouseId,
            totalItemPrice,
            shippingCost,
            totalPrice,
            shippingAddress,
            paymentMethod,
            paymentProof
          },
          { transaction: t }
        )

        await Transaction.update(
          {
            invoiceNo: parseInt(`${transactionResponse.id}${id}${warehouseId}`)
          },
          {
            where: { id: transactionResponse.id },
            transaction: t
          }
        )

        const getCartItem = await Cart.findAll({
          where: {
            userId: id
          },
          include: [
            {
              model: CartItem,
              where: {
                productId: {
                  [Op.in]: checkedProductId
                }
              }
            }
          ]
        })

        const dataCartId = getCartItem[0].id
        const dataCheckedProduct = getCartItem[0].Cart_Items

        const formattedData = dataCheckedProduct.map((item) => ({
          productId: item.productId,
          transactionId: transactionResponse.id,
          productPrice: item.totalPrice,
          quantity: item.quantity,
          totalPrice: item.totalPrice * item.quantity
        }))

        const transactionItemResponse = await TransactionItem.bulkCreate(
          formattedData,
          { transaction: t }
        )

        await CartItem.destroy({
          where: { cartId: dataCartId },
          transaction: t
        })

        await Cart.destroy({
          where: { id: dataCartId },
          transaction: t
        })

        return { transactionResponse, transactionItemResponse }
      })

      return res.status(200).json({
        success: 'Create transaction succeed',
        transaction
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Create transaction failed',
        message: err.message
      })
    }
  }
}

module.exports = userOrder
