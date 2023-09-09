const db = require('../../../models');
const Product = db.Product;
const { Op } = require("sequelize");

async function getAllProduct(req, res){
    try{
        const { name, limit, categoryId, sort, page } = req.query;

        const whereCondition = {};

        if(name){
            whereCondition.name = {
                [Op.like]: `%${name}%`  // % adalah wildcard untuk mencocokan semua nama, bisa lihat dokumentasi
            };
        }
        if(categoryId){
            whereCondition.categoryId = categoryId;
        }

        let order = [['createdAt', 'DESC']];

        if(sort){
            if(sort === 'createdAt_asc'){
                order = [['createdAt', 'ASC']];
            }if (sort === 'createdAt_desc'){
                order = [['createdAt', 'DESC']];
            }
        }
        const size = limit ? parseInt(limit) : 12; // jika pergam tidak diketahui, maka defaultnya adalah 12
        const offset = page ? (parseInt(page) - 1) * size : 0; // Menghitung offset berdasarkan halaman, 12 artikel 

        const products = await Product.findAll({
            where: whereCondition,
            limit: size, // Menggunakan limit yang telah diubah
            offset: offset, // Menggunakan offset yang telah dihitung
            order: order
        });

        res.status(200).json(products);

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {
    getAllProduct
};
