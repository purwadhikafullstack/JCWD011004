'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'CHAIRS',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'SOFAS',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'TABLE',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'WARDROBE',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'BED',
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
