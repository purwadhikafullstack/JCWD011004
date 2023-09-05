"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouse_Admin extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Warehouse, {
        foreignKey: "warehouseId",
      });
    }
  }
  Warehouse_Admin.init(
    {
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Warehouse_Admin",
    }
  );
  return Warehouse_Admin;
};
