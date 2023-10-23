"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mutation extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: "productId" });
      this.belongsTo(models.Warehouse, { foreignKey: "fromWarehouse" });
      this.belongsTo(models.Warehouse, { foreignKey: "toWarehouse" });
    }
  }
  Mutation.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fromWarehouse: {
        type: DataTypes.INTEGER,
      },
      toWarehouse: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Mutation",
    }
  );
  return Mutation;
};
