// routes/resetPass.js
const express = require('express')
const { validateEmail } = require('../middleware/emailValidator')
const passwordValidationRules = require('../middleware/passwordValidation')
const { requestResetPassword, resetPassword } = require('../controller/auth')

const router = express.Router()

// Register a new user
router.post('/reset-password', validateEmail, requestResetPassword)
router.patch('/reset-password', passwordValidationRules(), resetPassword)

module.exports = router
