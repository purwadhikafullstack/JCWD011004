const db = require('../../../models')
const User = db.User
const jwt = require('jsonwebtoken')
async function getUsersSortPagination(req, res) {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const { id: userId } = decoded
    const page = parseInt(req.query.page) || 1
    const size = parseInt(req.query.size) || 10
    const roleId = req.query.roleId || null
    const isActive = parseInt(req.query.isActive) || 1
    const sortAll = req.query.sortAll || false

    // Get the total number of items
    const totalItems = await User.count({
      where: {
        ...(roleId && { roleId }),
        ...(isActive === 2 && { isActive: true }),
        ...(isActive === 3 && { isActive: false })
      }
    })

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalItems / size)

    let users = await User.findAll({
      where: {
        ...(roleId && { roleId }),
        ...(isActive === 2 && { isActive: true }),
        ...(isActive === 3 && { isActive: false })
      },
      attributes: [
        'id',
        'roleId',
        'username',
        'email',
        'firstName',
        'lastName',
        'phoneNumber',
        'google',
        'isActive'
      ],
      include: [
        {
          model: db.Warehouse_Admin,
          as: 'Warehouse_Admins',
          required: false,
          include: [
            {
              model: db.Warehouse,
              as: 'Warehouse',
              attributes: ['name']
            }
          ]
        }
      ],
      limit: sortAll ? null : size,
      offset: sortAll ? null : (page - 1) * size
    })

    // Include the total number of pages in the response
    res.status(200).json({ users, totalPages })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getUsersSortPagination
}
