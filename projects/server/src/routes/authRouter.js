const express = require('express')
const router = express.Router()
const {login} = require('../controller/auth/login')
const { validateEmail } = require('../middleware/emailValidator')
const { registerUser } = require('../controller/auth/register')
const passwordValidationRules = require('../middleware/passwordValidation')
const { requestResetPassword, resetPassword } = require('../controller/auth')

router.post('/register', validateEmail, registerUser)
router.post('/login', login)
router.post('/reset-password', validateEmail, requestResetPassword)
router.patch('/reset-password', passwordValidationRules(), resetPassword)
module.exports = router
