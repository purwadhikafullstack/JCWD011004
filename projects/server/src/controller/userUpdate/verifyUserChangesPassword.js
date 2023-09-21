// controllers/userUpdate/verifyPasswordUpdate.js
const jwt = require('jsonwebtoken')
const db = require('../../../models')
const User = db.User

module.exports = async (req, res) => {
  const { token } = req.query
  try {
    let { userId, newPassword } = jwt.verify(
      token,
      process.env.JWT_KEY
    )

    await User.update(
      { password: newPassword },
      {
        where: {
          id: userId
        }
      }
    )
    
    res.status(200).send('User updated successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error verifying token')
  }
}