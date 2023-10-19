import React from 'react'
import CreateProductForm from './CreateProductForm'
import UpdateProductForm from './UpdateProductForm'
import WarehouseProductForm from './WarehouseForm'

const ModalProduct = ({ isOpen, onClose, modal, data }) => {
  return (
    <div className="flex container mx-auto p-10 justify-center items-start ">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
          <div
            className="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md shadow-lg"
            style={{ width: 'fit-content' }}
          >
            <div className="flex w-full h-auto justify-center items-center">
              <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                {modal == 0
                  ? 'Create Product'
                  : modal == 1
                  ? 'Update Product'
                  : 'Warehouse Product'}
              </div>
              <div
                onClick={onClose}
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
              <div className="inline-block" style={{ width: 'fit-content' }}>
                {modal == 0 ? (
                  <CreateProductForm onClose={onClose} />
                ) : modal == 1 ? (
                  <UpdateProductForm dataProduct={data} onClose={onClose} />
                ) : (
                  <WarehouseProductForm dataProduct={data} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalProduct
