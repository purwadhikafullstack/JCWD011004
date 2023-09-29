module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('warehouse_products', [
        {
          id: 1,
          productId: 17,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          productId: 18,
          stock: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          productId: 19,
          stock: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          productId: 20,
          stock: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      // Jika Anda ingin melakukan rollback, Anda dapat menghapus semua data dari tabel "warehouse_products"
      return queryInterface.bulkDelete('warehouse_products', null, {});
    }
  };
  