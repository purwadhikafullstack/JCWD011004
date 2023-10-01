module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Warehouse_Products', [
      {
        warehouseId: 1,
        productId: 1,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 1,
        productId: 2,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 1,
        productId: 3,
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        warehouseId: 1,
        productId: 4,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // If you want to perform a rollback, you can delete all data from the "Warehouse_Products" table
    return queryInterface.bulkDelete('Warehouse_Products', null, {})
  }
}
