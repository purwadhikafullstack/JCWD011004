const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })
}

const createHtmlContent = (host, token) => {
  return `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
          <a href="http://${host}/reset-password/${token}">Reset Password</a>
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

module.exports = sendEmail
