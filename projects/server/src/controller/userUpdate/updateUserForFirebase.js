//controller/userUpdate/updateUserForFirebase.js
const db = require('../../../models')
const User = db.User
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

async function updateUserForFirebase(req, res) {
  try {
    const { idToken, email } = req.body
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const user = await findUser(email)
    if (!user) return res.status(400).json({ message: 'User tidak ditemukan' })
    await updateUser(user, decodedToken.uid)
    await sendWelcomeEmail(user.email)
    return res
      .status(200)
      .json({ message: 'Akun berhasil diperbarui untuk masuk dengan Firebase' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

async function findUser(email) {
  return await User.findOne({ where: { email: email } })
}

async function updateUser(user, uid) {
  user.google = uid
  await user.save()
}

async function sendWelcomeEmail(email) {
  let transporter = createTransporter()
  let mailOptions = createMailOptions(email)
  sendMail(transporter, mailOptions)
}

function createTransporter() {
  return nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })
}

function createMailOptions(email) {
  return {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Welcome to AKUI!',
    html: `<html><head><title>Welcome to AKUI!</title></head><body><div style="text-align:center;"><h1>Welcome to AKUI, ${email}!</h1><p>Your account has been synced with Google. Now you can log in with Google.</p></div></body></html>`
  }
}

function sendMail(transporter, mailOptions) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error)
    else console.log('Email sent: ' + info.response)
  })
}

module.exports = {
  updateUserForFirebase
}
