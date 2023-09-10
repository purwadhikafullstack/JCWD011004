"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Transaction_Items", [
      {
        productId: 1,
        transactionId: 1,
        productPrice: 100,
        quantity: 2,
        totalPrice: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        transactionId: 1,
        productPrice: 75,
        quantity: 3,
        totalPrice: 225,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        transactionId: 2,
        productPrice: 50,
        quantity: 5,
        totalPrice: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        transactionId: 2,
        productPrice: 60,
        quantity: 4,
        totalPrice: 240,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        transactionId: 3,
        productPrice: 120,
        quantity: 1,
        totalPrice: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 6,
        transactionId: 3,
        productPrice: 90,
        quantity: 2,
        totalPrice: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        transactionId: 4,
        productPrice: 30,
        quantity: 6,
        totalPrice: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        transactionId: 4,
        productPrice: 40,
        quantity: 5,
        totalPrice: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Transaction_Items", null, {});
  },
};
