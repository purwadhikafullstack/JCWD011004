"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Warehouse, {
        foreignKey: "warehouseId",
      });
      this.belongsToMany(models.Product, {
        through: "Transaction_Item",
        foreignKey: "transactionId",
      });
      this.belongsTo(models.Transaction_Status, {
        foreignKey: "transactionStatusId",
        as: "statusTransaction",
      });
    }
  }
  Transaction.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      invoiceNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      totalItemPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      shippingAddress: {
        type: DataTypes.STRING,
      },
      paymentMethod: {
        type: DataTypes.STRING,
      },
      paymentProof: {
        type: DataTypes.STRING,
      },
      paymentStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      transactionStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Transaction_Status",
          key: "code",
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
