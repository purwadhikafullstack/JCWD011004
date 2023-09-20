const express = require('express')
const router = express.Router()
const { login } = require('../controller')
const { validateEmail } = require('../middleware/emailValidator')
const { registerUser } = require('../controller')
const passwordValidationRules = require('../middleware/passwordValidation')
const { requestResetPassword, resetPassword } = require('../controller/auth')
const { getUserInfo } = require('../controller/auth')
const {
  verifyValidator,
  validateRequest
} = require('../middleware/verifyValidator')
const requestResetPassword = require('../controller/auth/requestResetPassword')
const resetPassword = require('../controller/auth/resetPassword')
const { verifyUser } = require('../controller')
const { verifyToken } = require('../middleware/auth')

router.post('/register', validateEmail, registerUser)
router.post('/login', login)
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
