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
    await updateTransactionStatus(transaction, 0)
    await sendRejectionEmail()
    res.json({ message: 'Payment rejected successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateTransactionStatus = async (transaction, statusId) => {
  transaction.transactionStatusId = statusId
  await transaction.save()
}

const sendRejectionEmail = async () => {
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
    text: 'Your payment has been rejected, send the payment proof with good quality and clear image.'
  }

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = {
  rejectPayment
}
