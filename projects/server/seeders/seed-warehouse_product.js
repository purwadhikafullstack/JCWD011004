module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('warehouse_products', [
      {
        warehouseId: 1,
        productIds: 1,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 1,
        productIds: 2,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 1,
        productIds: 3,
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 1,
        productIds: 4,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // Jika Anda ingin melakukan rollback, Anda dapat menghapus semua data dari tabel "warehouse_products"
    return queryInterface.bulkDelete('warehouse_products', null, {})
  }
}
