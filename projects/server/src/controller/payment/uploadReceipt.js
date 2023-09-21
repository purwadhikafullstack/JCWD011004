db = require('../../../models')
const Transaction = db.Transaction


async function uploadReceipt(req, res){
    try {
        const trasactionId = req.params
        const {file} = req
        return res.status(200).json({file})
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    uploadReceipt
}