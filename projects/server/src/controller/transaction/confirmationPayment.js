const nodemailer = require('nodemailer')
const db = require('../../../models')
const Transaction = db.Transaction

const rejectPayment = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id }
    })
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    transaction.transactionStatusId = 0
    await transaction.save()

    // Nodemailer configuration
    let transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    })

    // Email options
    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: 'recipient@example.com', // replace with recipient email
      subject: 'Payment Rejection',
      text: 'Your payment has been rejected.'
    }

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    res.json({ message: 'Payment rejected successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  rejectPayment
}
