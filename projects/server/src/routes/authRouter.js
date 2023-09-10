const express = require('express')
const router = express.Router()
const { validateEmail } = require('../middleware/emailValidator')
const { login } = require('../controller')
const { registerUser } = require('../controller')

router.post('/register', validateEmail, registerUser)
router.post('/login', login)

module.exports = router
