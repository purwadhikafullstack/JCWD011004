'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: 'roleId'
      })
      this.hasMany(models.Address, {
        foreignKey: 'userId'
      })
      this.hasMany(models.Warehouse_Admin, {
        foreignKey: 'userId'
      })
      this.hasMany(models.Transaction, {
        foreignKey: 'userId'
      })
      this.hasMany(models.Cart, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileImage: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      twitter: {
        type: DataTypes.STRING
      },
      facebook: {
        type: DataTypes.STRING
      },
      google: {
        type: DataTypes.STRING
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
