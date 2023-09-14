const db = require('../../../models')
const Product = db.Product
const Category = db.Category
const Product_Image = db.Product_Image

async function seeDetailProduct(req, res){
    try{
        const productId = req.params.productId; // Mengambil ID produk dari parameter permintaan
        const product = await Product.findByPk(productId, {
            include: [
                {model: Category},
                {model: Product_Image},
            ]
        })

        if(!product){
            return res.status(404).json({ message: 'Product not found' }); // Produk tidak ditemukan, kembalikan respon dengan status 404
        }
        
        return res.status(200).json(product); // Kembalikan produk jika ditemukan dengan status 200
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' }); // Tangani kesalahan server dengan status 500
    }
}

module.exports = {
    seeDetailProduct
}
