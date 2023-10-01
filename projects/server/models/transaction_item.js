const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction_Item extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
      this.belongsTo(models.Transaction, {
        foreignKey: 'transactionId'
      })
    }
  }
  Transaction_Item.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Transaction_Item'
    }
  )
  return Transaction_Item
}
