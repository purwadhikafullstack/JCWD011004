db = require('../../../models')
const Category = db.Category

async function getAllCategory(req, res) {
  try {
    let data = await Category.findAll()
    data = data.filter((category) => category.id !== 99)
    return res.status(200).json({
      message: 'Get Category Succeed',
      data
    })
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: 'Get Category Failed',
      message: err.message
    })
  }
}

module.exports = {
  getAllCategory
}
