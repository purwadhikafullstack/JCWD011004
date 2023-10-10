const createWarehouse = require('../../service/warehouse/createWarehouse')
const deleteWarehouse = require('../../service/warehouse/deleteWarehouse')
const getWarehouse = require('../../service/warehouse/getAllWarehouse')
const updateWarehouse = require('../../service/warehouse/updateWarehouse')
// const { adminService } = require("../services");
const messages = require('../../helpers/message')

const createWarehouses = async (req, res) => {
  try {
    const { name, address, province, cityRegency, postalcode } = req.body
    const body = { name, address, province, cityRegency, postalcode }
    const result = await createWarehouse(body)
    res.status(result.status).json(messages.success(result))
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message)
  }
}

const updateWarehouses = async (req, res) => {
  try {
    const { id } = req.params
    const { name, address, province, cityRegency, postalcode } = req.body
    const body = { name, address, province, cityRegency, postalcode }
    const result = await updateWarehouse(id, body)
    res.status(result.status).json(messages.success(result))
  } catch (error) {
    res.status(500).json({ message: error.messages })
  }
}

const deleteWarehouses = async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteWarehouse(id)
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error deleting warehouse:", error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus gudang' });
  }
}

async function getWarehouses(req, res) {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
    const result = await getWarehouse(pageNumber, itemsPerPage);

    const responseData = {
      ...result,
      pagination: {
        page: pageNumber,
        perPage: itemsPerPage,
      },
    };

    res.status(result.status).json(messages.response(responseData));
  } catch (error) {
    console.error(error);
    res.status(500).json(messages.error(500, error.message));
  }
}


module.exports = {
  createWarehouses,
  updateWarehouses,
  deleteWarehouses,
  getWarehouses
}
