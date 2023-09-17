// helpers/emailRegister.js
const nodemailer = require('nodemailer')

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
    html: `
      <p>Hello ${email},</p>
      <p>Your account has been created. Please click the link below to set your password:</p>
      <a href="http://your-website.com/set-password/${token}">Set Password</a>
    `
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
