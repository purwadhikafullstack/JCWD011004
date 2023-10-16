const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { createHtmlContent } = require('../template/userUpdatePassword')
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })
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
