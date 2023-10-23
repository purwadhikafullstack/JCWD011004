const express = require('express')
const router = express.Router()
const {
  login,
  registerUser,
  requestResetPassword,
  resetPassword,
  getUserInfo,
  verifyUser,
  firebaseLogin,
  firebaseRegister
} = require('../controller')
const { validateEmail } = require('../middleware/emailValidator')

const passwordValidationRules = require('../middleware/passwordValidation')

const {
  verifyValidator,
  validateRequest
} = require('../middleware/verifyValidator')
const { verifyToken } = require('../middleware/auth')

router.post('/register', validateEmail, registerUser)
router.post('/login', login)
router.post('/login-social', firebaseLogin)
router.post('/register-social', firebaseRegister)
router.post('/reset-password', validateEmail, requestResetPassword)
router.patch('/reset-password', passwordValidationRules(), resetPassword)
router.get('/user', getUserInfo)
router.post(
  '/verify',
  verifyToken,
  verifyValidator,
  validateRequest,
  verifyUser
)

module.exports = router
