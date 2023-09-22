
async function UploadReceipt(req, res) {
  try {
    const transactionId = req.params.transactionId;
    const { file } = req;
    const UploadedReceipt = await transactionService.UploadReceipt(
      transactionId,
      file
    );
    return res.status(200).json(UploadedReceipt);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}