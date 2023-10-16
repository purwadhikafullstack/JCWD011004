'use strict'
const { StockJournal } = require('../models') // Pastikan kamu mengganti path sesuai dengan struktur folder proyekmu

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data untuk model "StockJournal"
    const stockJournalData = [
      {
        warehouseId: 1, // Ganti dengan nilai yang sesuai
        warehouseProductId: 1, // Ganti dengan nilai yang sesuai
        quantity: 20, // Ganti dengan nilai yang sesuai
        description: 'Penambahan stok produk A di gudang A',
        action: 'IN', // Ganti dengan nilai yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 2, // Ganti dengan nilai yang sesuai
        warehouseProductId: 2, // Ganti dengan nilai yang sesuai
        quantity: 5, // Ganti dengan nilai yang sesuai
        description: 'Pengurangan stok produk B di gudang B',
        action: 'OUT', // Ganti dengan nilai yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 1, // Ganti dengan nilai yang sesuai
        warehouseProductId: 2, // Ganti dengan nilai yang sesuai
        quantity: 10, // Ganti dengan nilai yang sesuai
        description: 'Penambahan stok produk C di gudang A',
        action: 'IN', // Ganti dengan nilai yang sesuai
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Jalankan query untuk menambahkan data ke tabel "StockJournal"
    await queryInterface.bulkInsert('StockJournals', stockJournalData, {})

    // Jika kamu memiliki kode lain yang harus dijalankan setelah seeding, tambahkan di sini.

    return stockJournalData
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data yang telah di-seed dari tabel "StockJournal"
    await queryInterface.bulkDelete('StockJournals', null, {})
  }
}
