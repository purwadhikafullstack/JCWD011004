const db = require('../../../models')
const User = db.User

const path = require('path')

const getUserImage = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userData.id
      }
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Construct the URL of the image
    const imageUrl = `http://localhost:8000/${user.profileImage}`
    // Send the URL in the response
    return res.json({ avatar: imageUrl })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getUserImage
}
