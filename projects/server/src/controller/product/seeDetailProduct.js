const db = require('../../../models')
const Product = db.Product
const Category = db.Category
const Product_Image = db.Product_Image

async function seeDetailProduct(req, res){
    try{
        const productId = req.params.productId;
        console.log(productId)
        const product = await Product.findByPk(productId, {
            include: [
                {model: Category},
                {model: Product_Image},
            ]
        })
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }    
        return res.status(200).json(product);
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' }); 
    }
}
module.exports = {
    seeDetailProduct
}
