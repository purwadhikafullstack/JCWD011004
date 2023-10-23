const jwt = require('jsonwebtoken')
const db = require('../../../models')
const User = db.User

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
}

async function getUserInfoFromToken(user) {
  return await User.findOne({
    where: {
      id: user.id
    },
    attributes: [
      'id',
      'roleId',
      'username',
      'email',
      'firstName',
      'lastName',
      'phoneNumber',
      'twitter',
      'facebook',
      'google'
    ]
  })
}

async function getUserInfo(req, res) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
      return res.sendStatus(401)
    }
    const user = await verifyToken(token)
    const userInfo = await getUserInfoFromToken(user)
    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res
      .status(200)
      .json({ message: 'User info retrieved successfully', userInfo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getUserInfo
}
