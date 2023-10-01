"use strict";

const { Transaction } = require("../models"); // Sesuaikan dengan path dan nama model yang sesuai

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data transaksi yang akan diisi ke dalam tabel 'Transactions'
    const transactionsData = [
      {
        userId: 5, // Ganti dengan userId yang sesuai
        warehouseId: 1, // Ganti dengan warehouseId yang sesuai
        invoiceNo: 1001, // Ganti dengan nomor faktur yang sesuai
        totalItemPrice: 300, // Total harga item
        totalPrice: 350, // Total harga keseluruhan
        shippingAddress: "Alamat Pengiriman 1",
        paymentMethod: "Metode Pembayaran 1",
        paymentProof: "Bukti Pembayaran 1",
        paymentStatus: true, // True jika sudah dibayar, false jika belum
        transactionStatus: "Status Transaksi 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6, // Ganti dengan userId yang sesuai
        warehouseId: 1, // Ganti dengan warehouseId yang sesuai
        invoiceNo: 1002, // Ganti dengan nomor faktur yang sesuai
        totalItemPrice: 400, // Total harga item
        totalPrice: 450, // Total harga keseluruhan
        shippingAddress: "Alamat Pengiriman 2",
        paymentMethod: "Metode Pembayaran 2",
        paymentProof: "Bukti Pembayaran 2",
        paymentStatus: false, // True jika sudah dibayar, false jika belum
        transactionStatus: "Status Transaksi 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7, // Ganti dengan userId yang sesuai
        warehouseId: 2, // Ganti dengan warehouseId yang sesuai
        invoiceNo: 1003, // Ganti dengan nomor faktur yang sesuai
        totalItemPrice: 500, // Total harga item
        totalPrice: 550, // Total harga keseluruhan
        shippingAddress: "Alamat Pengiriman 3",
        paymentMethod: "Metode Pembayaran 3",
        paymentProof: "Bukti Pembayaran 3",
        paymentStatus: true, // True jika sudah dibayar, false jika belum
        transactionStatus: "Status Transaksi 3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6, // Ganti dengan userId yang sesuai
        warehouseId: 2, // Ganti dengan warehouseId yang sesuai
        invoiceNo: 1004, // Ganti dengan nomor faktur yang sesuai
        totalItemPrice: 600, // Total harga item
        totalPrice: 650, // Total harga keseluruhan
        shippingAddress: "Alamat Pengiriman 4",
        paymentMethod: "Metode Pembayaran 4",
        paymentProof: "Bukti Pembayaran 4",
        paymentStatus: false, // True jika sudah dibayar, false jika belum
        transactionStatus: "Status Transaksi 4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Masukkan data transaksi ke dalam tabel 'Transactions'
    await Transaction.bulkCreate(transactionsData);
  },
}
