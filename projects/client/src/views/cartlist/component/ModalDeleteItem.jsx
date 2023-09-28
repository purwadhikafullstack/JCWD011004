import React from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ModalDeleteItem = ({
  showModalDelete,
  handleCloseShowModalDelete,
  deleteProduct,
  fetchData
}) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${apiUrl}/cart/removeitem`,
        { productId: deleteProduct.id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchData()
      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <div className="flex container mx-auto p-10 justify-center items-start">
      {showModalDelete && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
          <div className="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md">
            <div className="flex w-full h-auto justify-center items-center">
              <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                Delete Confirmation
              </div>
              <div
                onClick={handleCloseShowModalDelete}
                className="flex w-1/12 h-auto justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
            <div className="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500 mb-3">
              Are you sure you want to delete {deleteProduct?.name}?
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleCloseShowModalDelete()
                }}
                className="w-24 rounded-md  py-1.5 font-medium text-black active:text-slate-700"
              >
                cancel
              </button>
              <button
                onClick={() => {
                  handleDelete()
                  handleCloseShowModalDelete()
                }}
                className="w-24 rounded-md bg-orange-300 py-1.5 font-medium text-blue-50 hover:bg-orange-600 active:bg-orange-300"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default ModalDeleteItem
