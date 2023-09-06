"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsToMany(models.Cart, {
        through: "Cart_Item",
        foreignKey: "productId",
      });
      this.belongsToMany(models.Transaction, {
        through: "Transaction_Item",
        foreignKey: "productId",
      });
      this.belongsToMany(models.Warehouse, {
        through: "Warehouse_Product",
        foreignKey: "productId",
      });
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      this.hasMany(models.Product_Image, {
        foreignKey: "productId",
      });
      this.hasMany(models.Mutation, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};