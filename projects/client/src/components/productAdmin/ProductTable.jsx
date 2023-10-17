import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
// import axios from 'axios'
import { getAllProducts } from '../../services/reducer/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import ModalProduct from './ModalProduct'

const tableHead = [
  'No',
  'Category',
  'Product Name',
  'Price',
  'Weight',
  'Description',
  'Warehouse',
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
  const [currentPage, setCurrentPage] = useState(1)
  const [modalNumber, setModalNumber] = useState(0)

  function handleOpenModal(data) {
    setModalNumber(data)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  const products = dataProduct.products
  // const totalPage = dataProduct.totalPages

  useEffect(() => {
    const sortEndpoints = {
      0: `all?limit=12&sort=1&page=${currentPage}`,
      1: `all?limit=12&sort=2&page=${currentPage}`,
      2: `all?limit=12&sort=3&page=${currentPage}`
    }
    const endpoint = sortEndpoints[sortIdx]
    if (endpoint) {
      dispatch(getAllProducts(endpoint))
    }
  }, [dispatch, sortIdx, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [sortIdx])

  console.log(products)
  return (
    <>
      <div className="w-full flex gap-10 justify-end">
        <button
          onClick={() => handleOpenModal(0)}
          className={`btn h-9 w-36  active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
        >
          Create Product
        </button>
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
                            {index + 1}
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
                              {data.Warehouse_Products.length > 0
                                ? data.Warehouse_Products.map((data, index) => (
                                    <span key={index}>
                                      {data.Warehouse.name}
                                    </span>
                                  ))
                                : 'Unassigned'}
                            </div>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data.isActive ? 'Active' : 'Non Active'}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5 justify-center">
                            <button
                              onClick={() => {
                                handleOpenModal(1)
                              }}
                            >
                              <BsFillPencilFill />
                            </button>
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
      <ModalProduct
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modal={modalNumber}
      />
    </>
  )
}

export default ProductTable
