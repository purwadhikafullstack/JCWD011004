const cron = require('node-cron')
const db = require('../../models')
const User = db.User // adjust with your User model file path

function deleteUnverifiedUsers() {
  cron.schedule('0 * * * *', async function () {
    console.log('Running a Every one hour at 00 minutes past the hour')
    try {
      await User.destroy({
        where: {
          isVerified: false
        }
      })
      console.log('Unverified users deleted')
    } catch (err) {
      console.error('Error deleting unverified users', err)
    }
  })
}

module.exports = {
  deleteUnverifiedUsers
}
