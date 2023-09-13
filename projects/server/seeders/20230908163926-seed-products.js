"use strict";

const { Product } = require("../models"); // Sesuaikan dengan path dan nama model yang sesuai

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data produk yang akan diisi ke dalam tabel 'Products'
    const productsData = [
      {
        categoryId: 1, // Ganti dengan categoryId yang sesuai
        name: "Produk 1",
        price: 100,
        description: "Deskripsi Produk 1",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 2, // Ganti dengan categoryId yang sesuai
        name: "Produk 2",
        price: 200,
        description: "Deskripsi Produk 2",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 3, // Ganti dengan categoryId yang sesuai
        name: "Produk 3",
        price: 300,
        description: "Deskripsi Produk 3",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 4, // Ganti dengan categoryId yang sesuai
        name: "Produk 4",
        price: 400,
        description: "Deskripsi Produk 4",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Masukkan data produk ke dalam tabel 'Products'
    await Product.bulkCreate(productsData);
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data yang telah dimasukkan sebelumnya
    await queryInterface.bulkDelete("Products", null, {});
  },
};
