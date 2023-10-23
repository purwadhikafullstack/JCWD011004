// controllers/userUpdate/updatePassword.js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const db = require('../../../models')
const User = db.User

module.exports = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body

  // Get the user ID from the token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_KEY)
  const userId = decodedToken.id

  // Fetch the user from the database
  const user = await User.findOne({ where: { id: userId } })

  // Check if the old password is correct
  const validPassword = await bcrypt.compare(oldPassword, user.password)
  if (!validPassword) {
    return res.status(400).send('Old password is incorrect')
  }

  // Check if the new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .send('New password and confirm password do not match')
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // Generate a new token with the user ID and hashed password
  const newToken = jwt.sign(
    { userId, newPassword: hashedPassword },
    process.env.JWT_KEY
  )

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
    to: decodedToken.email,
    subject: 'Update your password',
    text: `Please click on the link to update your password: ${process.env.WHITELISTED_DOMAIN}/verify-password-changes/${newToken}`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send('Error sending email')
    } else {
      res.status(200).send('Check email untuk verifikasi perubahan password')
    }
  })
}
