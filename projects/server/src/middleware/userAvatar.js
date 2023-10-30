//middleware/userAvatar.js
const multer = require('multer')
const path = require('path')


// Set storage engine
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../public/uploads'),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime type
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit filesize to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('myImage')

module.exports = upload
