// controllers/userUpdate/updatePassword.js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const db = require('../../../models')
const User = db.User

const createHtmlContent = (email, subject, token) => {
  const WHITELISTED_DOMAIN = process.env.WHITELISTED_DOMAIN
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${subject}</title>
    </head>
    <body>
        <div style="text-align: center;">
            <h1>Welcome to AKUI!</h1>
            <p>Hello ${email},</p>
            <p>You are receiving this because you have requested to update your password.</p>
            <p>Please click the button below, or paste this into your browser to complete the process:</p>
            <a href="${WHITELISTED_DOMAIN}/verify-password-changes/${token}" style="background-color: orange; color: white; padding: 10px 20px; text-decoration: none;">${subject}</a>
            <br/>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <br/>
            <p>Best regards,</p>
            <p>Your AKUI! Service Team</p>
        </div>
    </body>
    </html>
  `
}

const getUserFromToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY)
  const userId = decodedToken.id
  return await User.findOne({ where: { id: userId } })
}

const checkPasswords = async (
  oldPassword,
  userPassword,
  newPassword,
  confirmPassword
) => {
  const validPassword = await bcrypt.compare(oldPassword, userPassword)
  if (!validPassword) {
    throw new Error('Old password is incorrect')
  }
  if (newPassword !== confirmPassword) {
    throw new Error('New password and confirm password do not match')
  }
}

const sendEmail = async (email, newToken) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Update your password',
    html: createHtmlContent(email, 'Update your password', newToken)
  }

  return await transporter.sendMail(mailOptions)
}

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const user = await getUserFromToken(token)

    await checkPasswords(
      oldPassword,
      user.password,
      newPassword,
      confirmPassword
    )

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const newToken = jwt.sign(
      { userId: user.id, newPassword: hashedPassword },
      process.env.JWT_KEY
    )

    await sendEmail(user.email, newToken)

    res.status(200).send('Check email untuk verifikasi perubahan password')
  } catch (error) {
    res.status(500).send(error.message)
  }
}
