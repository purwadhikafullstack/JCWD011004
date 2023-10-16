const jwt = require('jsonwebtoken')
const db = require('../../models')
const User = db.User

const authenticateSuperAdmin = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ message: 'no token' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ where: { id: decoded.user.id } })
    if (user && user.roleId === 1) {
      req.user = user
      next()
    } else {
      res.status(401).json({ message: 'tes' })
    }
  } catch (err) {
    res.status(401).json({ message: 'tets' })
  }
}

module.exports = authenticateSuperAdmin
