const db = require('../../../models')
const Product = db.Product
const Transaction_Item = db.Transaction_Item
const Product_Image = db.Product_Image
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
    if (categoryId) {
      whereCondition.categoryId = categoryId
    }
    let order
    if (sort === '1') {
      order = [['price', 'ASC']]
    }
    if (sort === '2') {
      order = [['price', 'DESC']]
    }
    if (sort === '3') {
      order = [['createdAt', 'ASC']]
    }

    const size = limit ? parseInt(limit) : 12
    const offset = page ? (parseInt(page) - 1) * size : 0
    const imageOptions = {
      model: Product_Image,
    }

    const products = await Product.findAll({
      where: whereCondition,
      limit: size,
      offset: offset,
      include: imageOptions,
      order: order
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

async function mostSales(req, res) {
  try {
    const { limit, page, categoryId } = req.query;
    const size = limit ? parseInt(limit) : 12;
    const offset = page ? (parseInt(page) - 1) * size : 0;

    const includeOptions = [
      {
        model: Product,
        as: "product", 
      },
      {
        model: Product_Image,
        as: "productImage", 
      },
    ];

    if (categoryId) {
      includeOptions[0].where = { categoryId: categoryId };
    }

    const products = await Transaction_Item.findAll({
      attributes: [
        'productId',
        [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalSales']
      ],
      group: ['productId'],
      order: [['totalSales', 'DESC']],
      limit: size,
      offset: offset,
      include: includeOptions,
    });

    const totalCount = await Transaction_Item.count({
      distinct: true,
      col: 'productId'
    });
    const totalPages = Math.ceil(totalCount / size);
    const currentPage = page ? parseInt(page) : 1;

    const response = {
      totalProducts: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      products: products
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = {
  getAllProduct,
  mostSales
}
