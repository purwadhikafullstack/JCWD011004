'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Buat beberapa data dummy untuk Cart
    await queryInterface.bulkInsert('Carts', [
      {
        userId: 1,
        totalItemPrice: 50,
        totalItem: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        totalItemPrice: 30,
        totalItem: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        totalItemPrice: 20,
        totalItem: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        totalItemPrice: 10,
        totalItem: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
