// helpers/emailRegister.js
const nodemailer = require('nodemailer')
const { createHtmlTemplate } = require('../template/registerHtml')

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
})

function createMailOptions(email, token) {
  return {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Account Registration Confirmation',
    html: createHtmlTemplate(email, token)
  }
}

function sendEmail(email, token) {
  return new Promise((resolve, reject) => {
    const mailOptions = createMailOptions(email, token)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({ status: 500, message: 'Email sending failed' })
      } else {
        resolve({
          status: 200,
          message:
            'Registration successful. Please check your email for further instructions.'
        })
      }
    })
  })
}

module.exports = {
  sendEmail
}
