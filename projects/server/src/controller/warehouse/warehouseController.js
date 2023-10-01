const createWarehouse = require('../../service/warehouse/createWarehouse')
const  deleteWarehouse  = require('../../service/warehouse/deleteWarehouse')
const  getWarehouse = require('../../service/warehouse/getAllWarehouse')
const  updateWarehouse  = require('../../service/warehouse/updateWarehouse')
// const { adminService } = require("../services");
const messages = require("../../helpers/message");

const createWarehouses = async (req, res) => {
  try {
    const { name, address, province, cityRegency, postalcode } = req.body;
    const body = { name, address, province, cityRegency, postalcode };
    const result = await createWarehouse(body);
    res.status(result.status).json(messages.success(result));
  } catch (error) {
    console.log(error);
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
    res.status(result.status).json(messages.success(result))
  } catch (error) {
    res.status(500).json({ message: error.messages })
  }
}

async function getWarehouses(req, res) {
  try {
    const result = await getWarehouse()
    console.log(result)
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = {
  createWarehouses,
  updateWarehouses,
  deleteWarehouses,
  getWarehouses
}
