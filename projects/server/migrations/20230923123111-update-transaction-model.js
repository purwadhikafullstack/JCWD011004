'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      warehouseId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      invoiceNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      totalItemPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      shippingAddress: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      paymentProof: {
        type: Sequelize.STRING
      },
      paymentStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      transactionStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Transaction_Status',
          key: 'code'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions')
  }
}
