'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId'
      })
      this.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
      this.hasMany(models.Transaction_Item, {
        foreignKey: 'transactionId'
      })
      this.belongsTo(models.Transaction_Status, {
        foreignKey: 'transactionStatusId'
      })
    }
  }
  Transaction.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      invoiceNo: {
        type: DataTypes.INTEGER,
        unique: true
      },
      totalItemPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      shippingCost: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      shippingAddress: {
        type: DataTypes.STRING
      },
      paymentMethod: {
        type: DataTypes.STRING
      },
      paymentProof: {
        type: DataTypes.STRING
      },
      paymentStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      transactionStatusId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        references: {
          model: 'Transaction_Statuses',
          key: 'code'
        }
      }
    },
    {
      sequelize,
      modelName: 'Transaction'
    }
  )
  return Transaction
}
