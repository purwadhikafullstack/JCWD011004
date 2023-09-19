const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Item extends Model {
    static associate(models) {
      // Asosiasi dengan model Product
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });

      // Asosiasi dengan model Product_Image
      this.belongsTo(models.Product_Image, {
        foreignKey: "productId", // Sesuaikan dengan kunci asing yang benar
        as: "productImage",
      });
    }
  }
  Transaction_Item.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productPrice: {
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
    },
    {
      sequelize,
      modelName: "Transaction_Item",
    }
  );
  return Transaction_Item;
};