//middleware/emailValidator.js
const { validationResult, check } = require('express-validator')

const validateEmail = [
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateEmail
}
