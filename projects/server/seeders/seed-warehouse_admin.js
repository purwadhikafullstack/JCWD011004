'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'warehouse_Admins',
      [
        {
          adminId: 3,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 9,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 10,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 13,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 14,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 16,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 17,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 19,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 20,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 21,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 22,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          adminId: 23,
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
