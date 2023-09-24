require('dotenv/config')
const express = require('express')
const cors = require('cors')
const { join } = require('path')
const { authRouter, userUpdate } = require('./routes')
const { productRouter } = require('./routes')
const { paymentRouter } = require('./routes')
const { transactionRouter } = require('./routes')
const PORT = process.env.PORT || 8000
const app = express()
const admin = require('./services/firebaseAdmin')
const path = require('path')
app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(',')
    ]
  })
)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

app.use(express.json())
// const db = require('../models')
// db.sequelize.sync({ alter: true })

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use('/api/auth', authRouter)
app.use('/api/update', userUpdate)
app.use('/api/product', productRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/transaction', transactionRouter)

app.get('/api', (req, res) => {
  res.send(`Hello, this is my API`)
})

app.get('/api/greetings', (req, res, next) => {
  res.status(200).json({
    message: 'Hello, Student !'
  })
})

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes('/api/')) {
    res.status(404).send('Not found !')
  } else {
    next()
  }
})

// error
app.use((err, req, res, next) => {
  if (req.path.includes('/api/')) {
    console.error('Error : ', err.stack)
    res.status(500).send('Error !')
  } else {
    next()
  }
})

//#endregion

//#region CLIENT
const clientPath = '../../client/build'
app.use(express.static(join(__dirname, clientPath)))

// Serve the HTML page
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, clientPath, 'index.html'))
})

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`)
  }
})
