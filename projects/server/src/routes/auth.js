const express = require('express');
const router = express.Router();
const UserController = require('../controllers/auth/login')


router.post('/login', UserController.login);

module.exports = router