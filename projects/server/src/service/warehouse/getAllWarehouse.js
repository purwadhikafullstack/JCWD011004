const db = require("../../../models");
const warehouse = db.Warehouse;
const messages = require("../../helpers/message");

const getWarehouse = async (page, perPage) => {
  try {
    const pageNumber = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(perPage, 10) || 10;

    // Hitung offset (mulai dari mana) dan limit (jumlah item yang diambil)
    const offset = (pageNumber - 1) * itemsPerPage;
    const limit = itemsPerPage;
    const result = await warehouse.findAndCountAll({
      offset,
      limit,
    });
    return messages.success('Successfully get warehouse', {
      data: result.rows,
      totalItems: result.count,
      page: pageNumber,
      perPage: itemsPerPage,
    });
  } catch (error) {
    return messages.error(500, error.message);
  }
};

module.exports = getWarehouse;