'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Chairs',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sofas',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Table',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Wardrobe',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bed',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {})
  }
}
