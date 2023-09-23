module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("Transaction_Statuses", [
        {
          name: "Menunggu Pembayaran",
          code: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Menunggu Konfirmasi Pembayaran",
          code: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Diproses",
          code: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dikirim",
          code: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pesanan Dikonfirmasi",
          code: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dibatalkan",
          code: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("Transaction_Statuses", null, {});
    },
  };