const db = require('../../../models')
const Product = db.Product
const Transaction_Item = db.Transaction_Item
const Category = db.Category;
const { Op } = require('sequelize')

async function getAllProduct(req, res) {
  try {
    const { name, limit, categoryId, sort, page } = req.query
    const whereCondition = {}
    if (name) {
      whereCondition.name = {
        [Op.like]: `%${name}%`
      }
    }
    if (categoryId) { whereCondition.categoryId = categoryId}
    let order
    if (sort === '1') {
      order = [['price', 'ASC']]
    } if (sort === '2') {
      order = [['price', 'DESC']]
    } if (sort === '3') {
      order = [['createdAt', 'ASC']]
    }

    const size = limit ? parseInt(limit) : 12
    const offset = page ? (parseInt(page) - 1) * size : 0

    const products = await Product.findAll({
      where: whereCondition,
      limit: size,
      offset: offset,
      order: order,
    })
    const totalCount = await Product.count({
      where: whereCondition
    })
    const totalPages = Math.ceil(totalCount / size)
    const currentPage = page ? parseInt(page) : 1
    const response = {
      products: products,
      totalProducts: totalCount,
      totalPages: totalPages,
      currentPage: currentPage
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function mostSales(req, res){
  try {
    const salesMost = await Transaction_Item.findAll({
      attributes: ['productId', [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalSales']],
      group: ['productId'],
      order: [['totalSales', 'DESC']],
      limit: 5,
      include: [{
        model: Product
      }]
    })

    res.status(200).json(salesMost);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = {
  getAllProduct,
  mostSales
}
