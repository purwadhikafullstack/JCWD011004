const express = require('express')
const router = express.Router()
const { validateEmail } = require('../middleware/emailValidator')
const { verifyToken, checkUserVerification } = require('../middleware/auth')
const { login } = require('../controller')
const { registerUser } = require('../controller')
const { verifyUser } = require('../controller')

router.post('/register', validateEmail, registerUser)
router.post('/login', login)
router.post('/verify', verifyUser)

module.exports = router
