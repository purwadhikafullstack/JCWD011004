const db = require('../../../models');
const Product = db.Product;
const Transaction_Item = db.Transaction_Item;
const { Op } = require("sequelize");

async function getAllProduct(req, res) {
    try {
        const { name, limit, categoryId, sort, page } = req.query;

        const whereCondition = {};

        if (name) {
            whereCondition.name = {
                [Op.like]: `%${name}%`
            };
        }
        if (categoryId) {
            whereCondition.categoryId = categoryId;
        }

        let order;

        if (sort === '1') {
            order = [['price', 'ASC']];
        } if (sort === '2') {
            order = [['price', 'DESC']];
        } if (sort === '3') {
            order = [['createdAt', 'DESC']];
        } 

        const size = limit ? parseInt(limit) : 12;
        const offset = page ? (parseInt(page) - 1) * size : 0;

        const products = await Product.findAll({
            where: whereCondition,
            limit: size,
            offset: offset,
            order: order
        });

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getMostSales(req, res) {
    try{
        const { sort } = req.query;
        let order = [];
        if(sort === '0'){
            order = [['quantity', 'DESC']];
        }

        const mostSales = await Transaction_Item.findAll({ order: order });

        if(!mostSales){
            return res.status(404).json({message: "Data tidak ditemukan"});
        }

        return res.status(200).json(mostSales);

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllProduct
    , getMostSales
};
