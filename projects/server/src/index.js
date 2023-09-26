require('dotenv/config')
const express = require('express')
const cors = require('cors')
const { join } = require('path')
const { authRouter, userUpdate } = require('./routes')
const { productRouter } = require('./routes')
const { cardRouter } = require('./routes')
const PORT = process.env.PORT || 8000
const app = express()
const admin = require('./services/firebaseAdmin')
const axios = require('axios')
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
const db = require('../models')
db.sequelize.sync({ alter: true })

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use('/api/auth', authRouter)
app.use('/api/update', userUpdate)
app.use('/api/product', productRouter)
app.use('/api/card', cardRouter)

app.get('/api/province', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.rajaongkir.com/starter/province',
      {
        headers: {
          Key: process.env.KEY_RAJAONGKIR
        }
      }
    )
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/province', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.rajaongkir.com/starter/province',
      {
        headers: {
          Key: process.env.KEY_RAJAONGKIR
        }
      }
    )
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/city', async (req, res) => {
  const dataProvince = req.query.province
  try {
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city?province=${dataProvince}`,
      {
        headers: {
          Key: process.env.KEY_RAJAONGKIR
        }
      }
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

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
