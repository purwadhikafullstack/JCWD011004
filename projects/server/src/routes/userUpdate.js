//routes/userUpdate.js
const express = require('express')
const router = express.Router()
const {
  updateUser,
  verifyUserUpdate,
  updatePassword,
  verifyPasswordUpdate,
  userUploadAvatar,
  getUserImage
} = require('../controller/userUpdate')
const { authenticate } = require('../middleware/userAuth')
router.post('/user', updateUser)
router.patch('/verify', verifyUserUpdate)
router.post('/user/password', updatePassword)
router.patch('/verify-password', verifyPasswordUpdate)
router.patch('/avatars', authenticate, userUploadAvatar)
router.get('/avatars', authenticate, getUserImage)

module.exports = router