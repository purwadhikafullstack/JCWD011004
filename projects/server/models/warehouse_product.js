'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Warehouse_Product extends Model {
    static associate(models) {
      // Asosiasi dengan model Product, menggunakan relasi belongsTo
      this.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  }

  Warehouse_Product.init(
    {
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Warehouse_Product'
    }
  )

  return Warehouse_Product
}
