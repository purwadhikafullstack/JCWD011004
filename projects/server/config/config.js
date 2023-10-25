const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },

  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: 'jcwd011004',
    password: 'jcwd011004',
    database: 'jcwd011004',
    host: 'adminer2.purwadhikabootcamp.com',
    dialect: 'mysql'
  }
}
