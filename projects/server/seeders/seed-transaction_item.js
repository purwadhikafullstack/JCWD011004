'use strict'

const { Transaction_Item } = require('../models') // Sesuaikan dengan path dan nama model yang sesuai

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data transaksi item yang akan diisi ke dalam tabel 'Transaction_Items'
    const transactionItemsData = [
      {
        productId: 16, // Ganti dengan productId yang sesuai
        transactionId: 1, // Ganti dengan transactionId yang sesuai
        productPrice: 100,
        quantity: 2,
        totalPrice: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 17, // Ganti dengan productId yang sesuai
        transactionId: 2, // Ganti dengan transactionId yang sesuai
        productPrice: 200,
        quantity: 3,
        totalPrice: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 18, // Ganti dengan productId yang sesuai
        transactionId: 3, // Ganti dengan transactionId yang sesuai
        productPrice: 300,
        quantity: 1,
        totalPrice: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 19, // Ganti dengan productId yang sesuai
        transactionId: 4, // Ganti dengan transactionId yang sesuai
        productPrice: 400,
        quantity: 4,
        totalPrice: 1600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 17, // Ganti dengan productId yang sesuai
        transactionId: 4, // Ganti dengan transactionId yang sesuai
        productPrice: 400,
        quantity: 4,
        totalPrice: 1600,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Masukkan data transaksi item ke dalam tabel 'Transaction_Items'
    await Transaction_Item.bulkCreate(transactionItemsData)
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data yang telah dimasukkan sebelumnya
    await queryInterface.bulkDelete('Transaction_Items', null, {})
  }
}
