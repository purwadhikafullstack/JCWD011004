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

const sendRejectionEmail = async (userEmail) => {
  // Nodemailer configuration
  let transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })

  const createHtmlContent = (email) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Payment Rejection</title>
      </head>
      <body>
          <div style="text-align: center;">
              <h1>Payment Rejection</h1>
              <p>Hello ${email},</p>
              <p>Your payment has been rejected. Please send the payment proof with good quality and clear image.</p>
              <br/>
              <p>Best regards,</p>
              <p>Your Service Team AKUI</p>
          </div>
      </body>
      </html>
    `
  }

  let mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: userEmail, // use user email
    subject: 'Payment Rejection',
    html: createHtmlContent(userEmail) // use user email
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
