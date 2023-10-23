'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'warehouse_Admins',
      [
        {
          adminId: 1,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 2,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 1,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 2,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 1,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 2,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 1,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 1,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 2,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 2,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 2,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 1,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // Add more entries as needed
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('warehouse_Admins', null, {})
  }
}
