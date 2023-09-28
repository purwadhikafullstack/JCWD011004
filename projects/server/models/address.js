'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Address.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
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
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      postalcode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
      },
      latitude: {
        type: DataTypes.DECIMAL(8, 6),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Address'
    }
  )
  return Address
}
