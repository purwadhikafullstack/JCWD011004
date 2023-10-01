'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      this.hasMany(models.Mutation, {
        foreignKey: 'fromWarehouse'
      })
      this.hasMany(models.Mutation, {
        foreignKey: 'toWarehouse'
      })
      this.hasMany(models.Warehouse_Admin, {
        foreignKey: 'warehouseId'
      })
      this.hasMany(models.Transaction, {
        foreignKey: 'warehouseId'
      })
    }
  }

  Warehouse.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cityRegency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subdistrict: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subDistrict: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Warehouse'
    }
  )
  return Warehouse
}
