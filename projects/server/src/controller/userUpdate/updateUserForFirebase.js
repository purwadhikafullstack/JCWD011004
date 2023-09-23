//controller/userUpdate/updateUserForFirebase.js
const db = require('../../../models')
const User = db.User
const admin = require('firebase-admin')

const updateUserForFirebase = async function (req, res) {
  const { idToken, email } = req.body
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid

    let user = await User.findOne({
      where: {
        email: email
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'User tidak ditemukan' })
    }

    // Perbarui user dengan uid Firebase
    user.google = uid
    await user.save()

    return res
      .status(200)
      .json({ message: 'Akun berhasil diperbarui untuk masuk dengan Firebase' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  updateUserForFirebase
}
