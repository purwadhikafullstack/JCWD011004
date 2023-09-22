const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan berkas dengan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan direktori penyimpanan berkas
    cb(null, 'public/uploads/'); // Sesuaikan dengan direktori penyimpanan yang Anda inginkan
  },
  filename: function (req, file, cb) {
    // Tetapkan nama berkas yang akan disimpan
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname); // Menambahkan timestamp ke nama berkas
  },
});

// Konfigurasi upload dengan multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Batasan ukuran berkas (5 MB dalam contoh ini)
  },
  fileFilter: function (req, file, cb) {
    // Fungsi ini digunakan untuk menentukan tipe berkas yang diterima
    const allowedTypes = /jpeg|jpg|png|gif/; // Contoh: Hanya menerima berkas gambar
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true); // Terima berkas
    } else {
      cb('Error: Hanya diperbolehkan berkas gambar (jpeg, jpg, png, gif)', false);
    }
  },
});

module.exports = {
    upload
}
