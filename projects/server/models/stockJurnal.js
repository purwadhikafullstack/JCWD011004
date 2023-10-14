'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StockJournal extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId' })
      this.belongsTo(models.Warehouse, { foreignKey: 'warehouseId' })
      this.belongsTo(models.Warehouse_Product, {
        foreignKey: 'warehouseProductId'
      })
    }
  }
  StockJournal.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      warehouseProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'StockJournal'
    }
  )
  return StockJournal
}
