// controllers/auth/register.js
const bcrypt = require('bcrypt')
db = require('../../../models')
const User = db.User

async function verifyUser(req, res) {
  try {
    const { username, phone, password } = req.body
    const { userId } = req.User

    const existingUsername = await User.findOne({ where: { username } })
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already registered' })
    }

    const existingPhone = await User.findOne({ where: { phone } })
    if (existingPhone) {
      return res.status(400).json({ message: 'Phone is already registered' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    await db.sequelize.transaction(async (t) => {
      await User.update(
        {
          username: username,
          phone: phone,
          password: hashPassword,
          isVerified: true
        },
        { where: { id: id } },
        { transaction: t }
      )
    })

    return res.status(200).json({
      success: 'Verification succeed',
      userId,
      username,
      phone,
      password
    })
  } catch (error) {
    console.error('Error during verification:', error)
    res.status(500).json({ message: 'Verification failed' })
  }
}

module.exports = {
  verifyUser
}
