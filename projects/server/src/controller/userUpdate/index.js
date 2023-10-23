//controller/userUpdate/index.js
const updateUser = require('./userUpdateData')
const verifyUserUpdate = require('./verifyUserUpdate')
const updatePassword = require('./userChangesPassword')
const verifyPasswordUpdate = require('./verifyUserChangesPassword')
const { userUploadAvatar } = require('./userUploadAvatar')
const { getUserImage } = require('./getUserImage')
const { updateUserForFirebase } = require('./updateUserForFirebase')
module.exports = {
  updateUser,
  verifyUserUpdate,
  updatePassword,
  verifyPasswordUpdate,
  updateUserForFirebase,
  userUploadAvatar,
  getUserImage
}
