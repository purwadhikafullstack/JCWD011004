'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = []
    for (let i = 1; i <= 20; i++) {
      users.push({
        roleId: 2,
        username: `user${i}`,
        email: `user${i}@example.com`,
        profileImage: `user${i}.jpg`,
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        phoneNumber: `123456789${i}`,
        password: `hashed_password_${i}`,
        twitter: `user${i}_twitter`,
        facebook: `user${i}_facebook`,
        google: `user${i}_google`,
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
