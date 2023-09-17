//controller/auth/requestResetPassword.js
const db = require('../../../models')
const User = db.User
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })
}

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1h' })
}

const createHtmlContent = (host, token) => {
  return `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
          <a href="${host}/reset-password/${token}">Reset Password</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
}

const createMailOptions = (user, req, token) => {
  const from = process.env.NODEMAILER_USER
  const to = user.email
  const subject = 'Password Reset'
  const host = process.env.WHITELISTED_DOMAIN
  const html = createHtmlContent(host, token)
  return {
    from,
    to,
    subject,
    html
  }
}

const sendEmail = async (user, req, token) => {
  try {
    const transporter = createTransporter()
    const mailOptions = createMailOptions(user, req, token)
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Failed to send email', error)
    return { status: 500, message: error.message }
  }
}

async function findExistingUser(email) {
  return await User.findOne({ where: { email } })
}

const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await findExistingUser(email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const token = generateToken(user)
    const info = await sendEmail(user, req, token)
    if (info.status === 500) {
      throw new Error(info.message)
    }
    res.status(200).json('Recovery email sent')
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Export the function
module.exports = requestResetPassword
