'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Transaction_Status extends Model {
    static associate(models) {
      Transaction_Status.hasMany(models.Transaction, {
        foreignKey: 'transactionStatusId'
      })
    }
  }
  Transaction_Status.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Transaction_Status'
    }
  )

  return Transaction_Status
}
