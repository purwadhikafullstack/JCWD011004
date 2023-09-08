"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed 12 produk
    const products = [];
    for (let i = 13; i <= 23; i++) {
      products.push({
        categoryId: 1, // Sesuaikan dengan categoryId yang sesuai
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 100) + 1, // Harga acak antara 1 hingga 100
        description: `Deskripsi Produk ${i}`,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Masukkan produk ke dalam tabel 'Products'
    await queryInterface.bulkInsert("Products", products, {});

    // Sintaksis lain yang mungkin diperlukan untuk mengaitkan produk dengan entitas lain
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data dari tabel 'Products'
    await queryInterface.bulkDelete("Products", null, {});
  },
};
