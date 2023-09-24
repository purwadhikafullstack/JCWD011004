//services/firebaseAdmin.js
const admin = require('firebase-admin')
const serviceAccount = require('../../firebase/multiwarehouse-ecommerce-firebase-adminsdk-aodl5-557482c98f.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
