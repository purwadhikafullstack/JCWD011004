const db = require('../../../models')
const Warehouse = db.Warehouse

const getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll()
    return res.status(200).json({ warehouses })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = getWarehouses
