const upload = require('../../middleware/userAvatar')
const db = require('../../../models')
const User = db.User

function userUploadAvatar(req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        msg: err
      })
    } else {
      if (req.file == undefined) {
        res.json({
          msg: 'Error: No File Selected!'
        })
      } else {
        // Update user's profile image in the database
        User.update(
          {
            profileImage: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
          },
          {
            where: {
              id: req.userData.id
            }
          }
        )
          .then(() => {
            res.json({
              msg: 'File Uploaded!',
              file: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
            })
          })
          .catch((err) => {
            res.json({
              msg: 'Error occurred while saving to database.'
            })
          })
      }
    }
  })
}

module.exports = {
  userUploadAvatar
}
