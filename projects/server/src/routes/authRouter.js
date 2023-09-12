const express = require('express');
const router = express.Router();
const Login = require('../controller/auth/login')
const { validateEmail } = require('../middleware/emailValidator')
const { registerUser } = require('../controller/auth/register')


router.post('/register', validateEmail, registerUser);
router.post('/login', Login.login);


module.exports = router