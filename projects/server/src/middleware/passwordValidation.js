const { body } = require('express-validator')

const passwordValidationRules = () => {
  return [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)
      .withMessage(
        'Password must contain at least one number and one special character'
      )
  ]
}

module.exports = passwordValidationRules
