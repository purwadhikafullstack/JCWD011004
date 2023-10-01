const db = require("../../../models")
const warehouse = db.Warehouse
const messages = require("../../helpers/message");

const getWarehouse = async () => {
  try {
    const result = await warehouse.findAll()
    return messages.success('successfully get warehouse', result)
  } catch (error) {
    return messages.error(500, error.message);
  }
}

module.exports = getWarehouse