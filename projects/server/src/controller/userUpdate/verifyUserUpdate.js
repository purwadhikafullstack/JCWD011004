// controllers/userUpdate/verifyUserUpdate.js
const jwt = require('jsonwebtoken')
const db = require('../../../models')
const User = db.User

const capitalize = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

module.exports = async (req, res) => {
  const { token } = req.query
  try {
    let { userId, firstName, lastName, email, phoneNumber } = jwt.verify(
      token,
      process.env.JWT_KEY
    )

    if (firstName) firstName = capitalize(firstName)
    if (lastName) lastName = capitalize(lastName)

    const updatedUserInfo = { firstName, lastName, phoneNumber }

    // If email is updated, also clear the google attribute
    if (email) {
      updatedUserInfo.email = email
      updatedUserInfo.google = null
    }

    await User.update(updatedUserInfo, {
      where: {
        id: userId
      }
    })

    res.status(200).send('User updated successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error verifying token')
  }
}
