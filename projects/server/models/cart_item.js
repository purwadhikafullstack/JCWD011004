"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    static associate(models) {
      // define association here
    }
  }
  Cart_Item.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Cart_Item",
    }
  );
  return Cart_Item;
};
