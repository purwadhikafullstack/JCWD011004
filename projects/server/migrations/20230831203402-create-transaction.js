'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      warehouseId: {
        type: Sequelize.INTEGER
      },
      invoiceNo: {
        type: Sequelize.INTEGER
      },
      totalItemPrice: {
        type: Sequelize.INTEGER
      },
      shippingCost: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.INTEGER
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
        type: Sequelize.BOOLEAN
      },
      transactionStatus: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions')
  }
}
