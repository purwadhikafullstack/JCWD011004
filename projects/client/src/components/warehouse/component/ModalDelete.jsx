import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function DeleteModal({ id, isOpen, onClose }) {
  console.log(id)
  const handleClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/warehouse/delete/${id}`
      )

      if (response.status === 200) {
        console.log('Gudang berhasil dihapus')
        toast.success('Gudang berhasil dihapus'),
          {
            position: toast.POSITION.TOP_CENTER
          }
      }
      setTimeout(() => {
        window.location.href = '/admin/warehouse'
      }, 1000)
    } catch (error) {
      console.log(error)
      toast.error('Terjadi kesalahan saat menghapus gudang')
    } finally {
      onClose
    }
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Hapus Warehouse
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Apakah anda yakin ingin menghapus warehouse ini?
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-red-600 px-3 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-red-800"
                    onClick={handleClick}
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 px-3 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    onClick={onClose}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteModal
