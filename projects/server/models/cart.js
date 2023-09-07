'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsToMany(models.Product, {
        through: 'Cart_Item',
        foreignKey: 'cartId'
      })
    }
  }
  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalItemPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      totalItem: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Cart'
    }
  )
  return Cart
}
