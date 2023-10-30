const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
 destination: path.resolve(__dirname, '../../public/uploads'),
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname)
    cb(null, Date.now() + extname)
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(
        'Error: Hanya diperbolehkan berkas gambar (jpeg, jpg, png, gif)',
        false
      )
    }
  }
})

module.exports = {
  upload
}
