//controller/auth/firebaseLogin.js
const db = require('../../../models')
const User = db.User
const admin = require('firebase-admin')
const jwt = require('jsonwebtoken')

async function firebaseRegister(req, res) {
  const { idToken } = req.body
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid
    const email = decodedToken.email
    const displayName = decodedToken.name
    const picture = decodedToken.picture || null

    // Pisahkan displayName menjadi firstName dan lastName
    let firstName = ''
    let lastName = ''
    if (displayName) {
      const nameParts = displayName.split(' ')
      firstName = nameParts[0]
      lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''
    }
    userName = displayName.replace(/\s/g, '')
    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan' })
    }

    // Buat user baru
    const user = await User.create({
      email: email,
      google: uid,
      roleId: 3,
      username: userName,
      firstName: firstName,
      lastName: lastName,
      profileImage: picture,
      isVerified: 1
    })

    const payload = { id: user.id, role: user.roleId, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
    return res
      .status(200)
      .json({ message: 'Registrasi Berhasil', token, role: user.roleId })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function firebaseLogin(req, res) {
  const { idToken } = req.body
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid
    const email = decodedToken.email

    let user = await User.findOne({
      where: {
        google: uid
      }
    })

    if (!user) {
      return firebaseRegister(req, res)
    }

    const payload = { id: user.id, role: user.roleId, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '8h' }) // jangan lupa ganti
    return res
      .status(200)
      .json({ message: 'Login Berhasil', token, role: user.roleId })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  firebaseLogin,
  firebaseRegister
}
