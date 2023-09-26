//routes/userUpdate.js
const express = require('express')
const router = express.Router()
const {
  updateUser,
  verifyUserUpdate,
  updatePassword,
  verifyPasswordUpdate,
  userUploadAvatar,
  getUserImage,
  updateUserForFirebase
} = require('../controller/userUpdate')
const { addAddress } = require('../controller')
const { authenticate } = require('../middleware/userAuth')

router.post('/user', updateUser)
router.patch('/verify', verifyUserUpdate)
router.post('/user/password', updatePassword)
router.patch('/verify-password', verifyPasswordUpdate)
router.patch('/avatars', authenticate, userUploadAvatar)
router.patch('/user-google-auth', updateUserForFirebase)
router.get('/avatars', authenticate, getUserImage)
router.post('/address', authenticate, addAddress)
router.patch('/address', authenticate)

module.exports = router
