const db = require("../../../models")
const Transaction = db.Transaction
const 


const getAllOrderStatus = async (req, res) =>{
    try {
        const {id} = req.body
        const result = await transaction.getAllOrderStatus 
        return res.status(200).json()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllOrderStatus
}