const { validationResult, body } = require('express-validator')

const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: 'Validation failed', message: errors.array() })
  }
  next()
}

const verifyValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('phone').isMobilePhone().withMessage('Invalid phone format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one capital letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
    .withMessage('Password must contain at least one special character'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password doesn't match the password")
    }
    return true
  })
]

module.exports = { validateRequest, verifyValidator }
