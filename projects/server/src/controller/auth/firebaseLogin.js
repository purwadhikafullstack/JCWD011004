//controller/auth/firebaseLogin.js
const db = require('../../../models')
const User = db.User
const admin = require('firebase-admin')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

async function firebaseRegister(req, res) {
  try {
    const { idToken } = req.body
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const user = await createUser(decodedToken)
    await sendWelcomeEmail(user.email, user.firstName)
    const token = jwt.sign(
      { id: user.id, role: user.roleId, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
    return res
      .status(200)
      .json({ message: 'Registrasi Berhasil', token, role: user.roleId })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

async function createUser(decodedToken) {
  const uid = decodedToken.uid
  const email = decodedToken.email
  const displayName = decodedToken.name
  const picture = decodedToken.picture || null
  let firstName = ''
  let lastName = ''
  if (displayName) {
    const nameParts = displayName.split(' ')
    firstName = nameParts[0]
    lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''
  }
  userName = displayName.replace(/\s/g, '')
  const existingUser = await User.findOne({ where: { email: email } })
  if (existingUser) throw new Error('Email sudah digunakan')
  return await User.create({
    email: email,
    google: uid,
    roleId: 3,
    username: userName,
    firstName: firstName,
    lastName: lastName,
    profileImage: picture,
    isVerified: 1
  })
}

async function sendWelcomeEmail(email) {
  let transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })

  let mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Welcome to AKUI!',
    html: `<html><head><title>Welcome to AKUI!</title></head><body><div style="text-align:center;"><h1>Welcome to AKUI, ${email}!</h1><p>We're excited to have you on board.</p></div></body></html>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error)
    else console.log('Email sent: ' + info.response)
  })
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
