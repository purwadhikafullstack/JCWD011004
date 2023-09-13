'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
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
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
