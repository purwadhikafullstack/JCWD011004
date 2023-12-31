'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Warehouses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      cityRegency: {
        type: Sequelize.STRING
      },
      subdistrict: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      postalcode: {
        type: Sequelize.INTEGER
      },
      longitude: {
        type: Sequelize.DECIMAL
      },
      latitude: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Warehouses')
  }
}
