// controllers/userUpdate/userController.js

const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const db = require('../../../models')
const User = db.User
const { createHtmlContent } = require('../../template/userUpdateAccount')
module.exports = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body

  // Get the user ID from the token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_KEY)
  const userId = decodedToken.id

  // Check if the email is already in use by another user
  if (email) {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser && existingUser.id !== userId) {
      return res.status(400).send('Email is already in use')
    }
  }

  // Prepare the updated user info
  const updatedUserInfo = {}
  if (firstName) updatedUserInfo.firstName = firstName
  if (lastName) updatedUserInfo.lastName = lastName
  if (email) updatedUserInfo.email = email
  if (phoneNumber) updatedUserInfo.phoneNumber = phoneNumber

  // Update the user data using the user ID
  await User.update(updatedUserInfo, { where: { id: userId } })

  // Generate a new token with the user ID and updated user info
  const newToken = jwt.sign({ userId, ...updatedUserInfo }, process.env.JWT_KEY)

  // Send the token via email
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email || decodedToken.email, // Use the new email if it exists, otherwise use the current email
    subject: 'Update your information',
    html: createHtmlContent(
      email || decodedToken.email,
      'Update your information',
      newToken
    )
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.status(500).send('Error sending email')
    } else {
      console.log('Email sent: ' + info.response)
      res.send('Email sent')
    }
  })
}
