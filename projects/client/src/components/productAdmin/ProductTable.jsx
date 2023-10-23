import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
// import axios from 'axios'
import { getAllProducts } from '../../services/reducer/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import ModalProduct from './ModalProduct'
import jwtdecode from 'jwt-decode'

const user = () => {
  const token = localStorage.getItem('token')
  if (token) return jwtdecode(token)
}

const tableHead = [
  'No',
  'Category',
  'Product Name',
  'Price',
  'Weight',
  'Description',
  'Warehouse',
  'Image',
  'Status',
  'Action'
]
// eslint-disable-next-line no-undef
// const apiUrl = process.env.REACT_APP_API_BASE_URL

function ProductTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const dataProduct = useSelector((state) => state.dataProduct.allProducts)
  const sortIdx = useSelector((state) => state.dataProduct.sortIdx)
  const isWarehouseProduct = useSelector(
    (state) => state.dataProduct.isWarehouseProduct
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [modalNumber, setModalNumber] = useState(0)
  const [productIndex, setProductIndex] = useState(1)
  const [warehouseProduct, setWarehouseProduct] = useState([])

  function handleOpenModal(data, dataWarehouse) {
    setModalNumber(data)
    setIsModalOpen(true)
    setWarehouseProduct(dataWarehouse)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  const products = dataProduct.products
  const totalPage = dataProduct.totalPages

  useEffect(() => {
    const sortEndpoints = {
      0: `all?limit=12&sort=1&page=${currentPage}`,
      1: `all?limit=12&sort=2&page=${currentPage}`,
      2: `all?limit=12&sort=3&page=${currentPage}`
    }
    const endpoint = sortEndpoints[2]
    if (endpoint) {
      dispatch(getAllProducts(endpoint))
    }
  }, [dispatch, sortIdx, currentPage, isWarehouseProduct])

  useEffect(() => {
    setCurrentPage(1)
  }, [sortIdx])

  const handlePageChange = (newPage) => {
    const newStartIndex = (newPage - 1) * 12
    setProductIndex(newStartIndex + 1)
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage)
    }
  }

  return (
    <>
      <div className="w-full flex gap-10 justify-end">
        {user().role === 1 ? (
          <button
            onClick={() => handleOpenModal(0)}
            className={`btn h-9 w-36  active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
          >
            Create Product
          </button>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-10 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    {tableHead &&
                      tableHead.map((item, index) => (
                        <th
                          scope="col"
                          className="text-sm font-medium  text-gray-900 px-6 py-4 text-center"
                          key={index}
                        >
                          {item}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {products
                    ? products.map((data, index) => (
                        <tr key={index} className="bg-white border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {productIndex + index}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data.Category.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data.price}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data.weight}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data.description}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              {data.Warehouse_Products.length > 0 ? (
                                <button
                                  onClick={() => handleOpenModal(2, data)}
                                  className={`btn h-9 w-20  active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
                                >
                                  View
                                </button>
                              ) : user().role === 1 ? (
                                <button
                                  onClick={() => handleOpenModal(2, data)}
                                  className={`btn h-9 w-16 active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
                                >
                                  Add
                                </button>
                              ) : (
                                'No Warehouse'
                              )}
                            </div>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              {data.Product_Images.length > 0 ? (
                                <button
                                  onClick={() => handleOpenModal(3, data)}
                                  className={`btn h-9 w-20  active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
                                >
                                  View
                                </button>
                              ) : user().role === 1 ? (
                                <button
                                  onClick={() => handleOpenModal(3, data)}
                                  className={`btn h-9 w-16 active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
                                >
                                  Add
                                </button>
                              ) : (
                                'No Image'
                              )}
                            </div>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data.isActive ? 'Active' : 'Non Active'}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5 justify-center">
                            {user().role === 1 ? (
                              <button
                                onClick={() => {
                                  handleOpenModal(1, data)
                                }}
                              >
                                <BsFillPencilFill />
                              </button>
                            ) : (
                              'No Action'
                            )}
                          </td>
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center m-4">
        {totalPage > 1 && (
          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-orange-500 text-white w-24 py-2 rounded-l ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } px-3 py-2 ${index === 0 ? 'rounded-l' : ''} ${
                  index === totalPage - 1 ? 'rounded-r' : ''
                } cursor-pointer`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
              className={`bg-orange-500 text-white w-24 py-2 rounded-r ${
                currentPage === totalPage
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <ModalProduct
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modal={modalNumber}
        data={warehouseProduct}
      />
    </>
  )
}

export default ProductTable
