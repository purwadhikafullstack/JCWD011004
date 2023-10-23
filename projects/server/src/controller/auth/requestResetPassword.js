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

const createHtmlContent = (email, token) => {
  const WHITELISTED_DOMAIN = process.env.WHITELISTED_DOMAIN
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset</title>
    </head>
    <body>
        <div style="text-align: center;">
            <h1>Welcome to AKUI!</h1>
            <p>Hello ${email},</p>
            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click the button below, or paste this into your browser to complete the process within one hour of receiving it:</p>
            <a href="${WHITELISTED_DOMAIN}/reset-password/${token}" style="background-color: orange; color: white; padding: 10px 20px; text-decoration: none;">Reset Password</a>
            <br/>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <br/>
            <p>Best regards,</p>
            <p>Your Service Team</p>
        </div>
    </body>
    </html>
  `
}

const createMailOptions = (user, token) => {
  const from = process.env.NODEMAILER_USER
  console.log(token)
  const to = user.email
  const subject = 'Password Reset'
  const html = createHtmlContent(to, token)
  return {
    from,
    to,
    subject,
    html
  }
}

const sendEmail = async (user, token) => {
  try {
    const transporter = createTransporter()
    const mailOptions = createMailOptions(user, token)
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
    const info = await sendEmail(user, token)
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
