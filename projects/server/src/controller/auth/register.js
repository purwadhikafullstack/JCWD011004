// controllers/auth/register.js
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
db = require('../../../models')
const User = db.User

async function registerUser(req, res) {
  try {
    const { email } = req.body
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' })
    }
    const newUser = await User.create({
      email,
      roleId: 3,
      isVerified: false
    })

    // Send a confirmation email to the user
    const transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE, // Use the environment variable
      auth: {
        user: process.env.NODEMAILER_USER, // Use the environment variable
        pass: process.env.NODEMAILER_PASS // Use the environment variable
      }
    })

    const mailOptions = {
      from: process.env.NODEMAILER_USER, // Use the environment variable
      to: email,
      subject: 'Account Registration Confirmation',
      html: `
        <p>Hello ${email},</p>
        <p>Your account has been created. Please click the link below to set your password:</p>
        <a href="http://your-website.com/set-password/${newUser.id}">Set Password</a>
      `
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error)
        return res.status(500).json({ message: 'Email sending failed' })
      }
      console.log('Email sent:', info.response)
      res.status(200).json({
        message:
          'Registration successful. Please check your email for further instructions.'
      })
    })
  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({ message: 'Registration failed' })
  }
}

module.exports = {
  registerUser
}
