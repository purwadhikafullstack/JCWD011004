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
  body('name').notEmpty().withMessage('Username is required'),
  body('phone').isMobilePhone().withMessage('Invalid phone format'),
  body('address').notEmpty().withMessage('Username is required'),
  body('province').notEmpty().withMessage('Username is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('username').notEmpty().withMessage('Username is required')
]

module.exports = { validateRequest, verifyValidator }
