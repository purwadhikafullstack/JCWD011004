//middleware/userAuth.js
const jwt = require('jsonwebtoken')

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      message: 'Auth failed: No Authorization header'
    })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      message: 'Auth failed: Bearer token missing'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
}

module.exports = {
  authenticate
}
