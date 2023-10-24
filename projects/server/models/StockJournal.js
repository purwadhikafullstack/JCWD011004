const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StockJournal extends Model {
    static associate(models) {
      this.belongsTo(models.Warehouse, { foreignKey: 'warehouseId' })
      this.belongsTo(models.Warehouse_Product, {
        foreignKey: 'warehouseProductId',
        onDelete: 'CASCADE'
      })
    }
  }

  StockJournal.init(
    {
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      warehouseProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'StockJournal'
    }
  )

  return StockJournal
}
