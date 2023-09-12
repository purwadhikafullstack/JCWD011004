// routes/register.js
const express = require('express')
const { validateEmail } = require('../middleware/emailValidator')
const { registerUser } = require('../controller/auth')

const router = express.Router()

// Register a new user
router.post('/register', validateEmail, registerUser)

module.exports = router
