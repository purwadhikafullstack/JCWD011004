'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.Cart, {
        foreignKey: 'productId'
      })
      this.hasMany(models.Transaction, {
        foreignKey: 'productId'
      })
      this.hasMany(models.Warehouse_Product, {
        foreignKey: 'productId'
      })
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })
      this.hasMany(models.Product_Image, {
        foreignKey: 'productId'
      })
      this.hasMany(models.Mutation, {
        foreignKey: 'productId'
      })
      this.hasMany(models.Transaction_Item, {
        foreignKey: 'productId'
      })
    }
  }

  Product.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'Product'
    }
  )
  return Product
}
