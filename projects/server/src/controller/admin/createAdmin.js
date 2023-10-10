const jwt = require('jsonwebtoken')
const db = require('../../../models')
const User = db.User
const Warehouse_Admin = db.Warehouse_Admin
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')

async function createWarehouseAdmin(req, res) {
  try {
    const { email, username, firstName, lastName, phoneNumber, warehouseId } =
      req.body
    const user = await createUser(
      email,
      username,
      firstName,
      lastName,
      phoneNumber
    )
    if (user.status) {
      return res.status(user.status).json({ message: user.message })
    }
    await createWarehouseAdminRecord(user.id, warehouseId)
    await sendVerificationEmail(email, firstName, createJwtToken(user.id))
    return res.status(201).json({ message: 'Warehouse admin created' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function createUser(email, username, firstName, lastName, phoneNumber) {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { phoneNumber }, { username }]
    }
  })
  if (existingUser) {
    return {
      status: 400,
      message: 'Email, phone number, or username already taken'
    }
  }
  const user = await User.create({
    roleId: 2,
    email,
    username,
    firstName,
    lastName,
    phoneNumber
  })
  return user
}

async function createWarehouseAdminRecord(adminId, warehouseId) {
  await Warehouse_Admin.create({
    adminId,
    warehouseId
  })
}

function createJwtToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_KEY)
}

async function sendVerificationEmail(email, firstName, token) {
  const transporter = createTransporter()
  const mailOptions = createMailOptions(email, firstName, token)
  await sendMail(transporter, mailOptions)
}

function createTransporter() {
  return nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })
}

function createMailOptions(email, firstName, token) {
  return {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Welcome to our warehouse management system',
    html: `
      <p>Hi ${firstName},</p>
      <p>Your account has been created successfully.</p>
      <p>Use the following link to verify your account:</p>
      <p><a href="${process.env.WHITELISTED_DOMAIN}/verify-admin/${token}">${process.env.WHITELISTED_DOMAIN}/verify-admin/${token}</a></p>
    `
  }
}

async function sendMail(transporter, mailOptions) {
  await transporter.sendMail(mailOptions)
}

module.exports = { createWarehouseAdmin }
