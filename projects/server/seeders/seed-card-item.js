'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cart_Items', [
      {
        cartId: 5,
        productId: 1,
        quantity: 2,
        totalPrice: 20,
        isChecked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cartId: 6,
        productId: 2,
        quantity: 3,
        totalPrice: 30,
        isChecked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cartId: 7,
        productId: 1,
        quantity: 1,
        totalPrice: 10,
        isChecked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cartId: 8,
        productId: 2,
        quantity: 2,
        totalPrice: 20,
        isChecked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cart_Items', null, {});
  },
};
