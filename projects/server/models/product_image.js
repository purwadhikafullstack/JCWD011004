'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product_Image extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  }
  Product_Image.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Product_Image'
    }
  )
  return Product_Image
}
