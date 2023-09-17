const express = require('express')
const router = express.Router()
const {login} = require('../controller')
const { validateEmail } = require('../middleware/emailValidator')
const { registerUser } = require('../controller')
const passwordValidationRules = require('../middleware/passwordValidation')
const requestResetPassword = require('../controller/auth/requestResetPassword')
const resetPassword  = require('../controller/auth/resetPassword')

router.post('/register', validateEmail, registerUser)
router.post('/login', login)
router.post('/reset-password', validateEmail, requestResetPassword)
router.patch('/reset-password', passwordValidationRules(), resetPassword)

module.exports = router
