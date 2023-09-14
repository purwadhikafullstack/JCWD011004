"use strict";

const { Warehouse } = require("../models"); // Sesuaikan dengan path dan nama model yang sesuai

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data gudang yang akan diisi ke dalam tabel 'Warehouses'
    const warehousesData = [
      {
        name: "Gudang 1",
        country: "Negara 1",
        province: "Provinsi 1",
        cityRegency: "Kota/Kabupaten 1",
        district: "Kecamatan 1",
        subDistrict: "Kelurahan 1",
        street: "Jalan 1",
        longitude: 123.456, // Ganti dengan nilai yang sesuai
        latitude: 789.012, // Ganti dengan nilai yang sesuai
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gudang 2",
        country: "Negara 2",
        province: "Provinsi 2",
        cityRegency: "Kota/Kabupaten 2",
        district: "Kecamatan 2",
        subDistrict: "Kelurahan 2",
        street: "Jalan 2",
        longitude: 456.789, // Ganti dengan nilai yang sesuai
        latitude: 123.012, // Ganti dengan nilai yang sesuai
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Masukkan data gudang ke dalam tabel 'Warehouses'
    await Warehouse.bulkCreate(warehousesData);
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data yang telah dimasukkan sebelumnya
    await queryInterface.bulkDelete("Warehouses", null, {});
  },
};
