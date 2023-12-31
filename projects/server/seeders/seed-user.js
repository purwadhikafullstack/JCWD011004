"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Gantilah dengan data seeder yang sesuai
    const users = [
      {
        roleId: 2,
        username: "user1",
        email: "user1@example.com",
        profileImage: "user1.jpg",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123456789890",
        password: "hashed_password_1",
        twitter: "user1_twitter",
        facebook: "user1_facebook",
        google: "user1_google",
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        username: "user2",
        email: "user2@example.com",
        profileImage: "user2.jpg",
        firstName: "Jane",
        lastName: "Smith",
        phoneNumber: "0857675656567",
        password: "hashed_password_2",
        twitter: "user2_twitter",
        facebook: "user2_facebook",
        google: "user2_google",
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan data pengguna lainnya jika diperlukan
    ];

    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data yang telah dimasukkan sebelumnya
    await queryInterface.bulkDelete("Users", null, {});
  },
};
