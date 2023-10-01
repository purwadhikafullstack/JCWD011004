'use strict'

const { Product } = require('../models') // Sesuaikan dengan path dan nama model yang sesuai

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data produk yang akan diisi ke dalam tabel 'Products'
    const productsData = [
      {
        categoryId: 1,
        name: 'Produk 1',
        price: 100,
        description: 'Deskripsi Produk 1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        name: 'Produk 2',
        price: 200,
        description: 'Deskripsi Produk 2',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        name: 'Produk 3',
        price: 300,
        description: 'Deskripsi Produk 3',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        name: 'Produk 4',
        price: 400,
        description: 'Deskripsi Produk 4',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        name: 'Produk 5',
        price: 100,
        description: 'Deskripsi Produk 5',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        name: 'Produk 6',
        price: 200,
        description: 'Deskripsi Produk 6',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        name: 'Produk 7',
        price: 300,
        description: 'Deskripsi Produk 7',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        name: 'Produk 8',
        price: 400,
        description: 'Deskripsi Produk 8',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        name: 'Produk 9',
        price: 100,
        description: 'Deskripsi Produk 9',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        name: 'Produk 10',
        price: 200,
        description: 'Deskripsi Produk 10',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 3,
        name: 'Produk 11',
        price: 300,
        description: 'Deskripsi Produk 11',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 4,
        name: 'Produk 12',
        price: 400,
        description: 'Deskripsi Produk 12',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        name: 'Produk 13',
        price: 200,
        description: 'Deskripsi Produk 13',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 1,
        name: 'Produk 14',
        price: 300,
        description: 'Deskripsi Produk 14',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: 2,
        name: 'Produk 15',
        price: 400,
        description: 'Deskripsi Produk 15',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Masukkan data produk ke dalam tabel 'Products'
    await Product.bulkCreate(productsData)
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data yang telah dimasukkan sebelumnya
    await queryInterface.bulkDelete('Products', null, {})
  }
}
