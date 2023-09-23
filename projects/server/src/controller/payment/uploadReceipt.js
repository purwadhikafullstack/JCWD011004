const paymentService = require('../../service/paymentService'); 

async function uploadReceipt(req, res) {
  try {
    const id = req.params.id;
    const { file } = req;
    const UploadedReceipt = await paymentService.uploadPaymentProof(id, file);
    return res.status(200).json(UploadedReceipt);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  uploadReceipt
};
