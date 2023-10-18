import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const apiUrl = process.env.REACT_APP_API_BASE_URL

const Report = () => {
  const headTabel = ['No', 'Warehouse', 'Product', 'Stock', 'Actions']
  const [products, setProducts] = useState([])
  //   const [showHistoryModal, setShowHistoryModal] = useState(false)
  //   const [historyData, setHistoryData] = useState([])
  const [warehouseFilter, setWarehouseFilter] = useState('')
  const [warehouses, setWarehouses] = useState([]) // State untuk daftar gudang

  const fetchProductsStock = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/history/all-history?warehouseId=${warehouseFilter}`
      )
      //   console.log(response)
      setProducts(response?.data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch product data')
    }
  }

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/warehouse/get-all`)
      console.log(response?.data.data.data)
      setWarehouses(response?.data?.data?.data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch warehouses')
    }
  }

  //   const openHistoryModal = async (product) => {
  //     try {
  //       const response = await axios.get(
  //         `${apiUrl}/history/history/${product.id}`
  //       )
  //       console.log(response)
  //       setHistoryData(response?.data)
  //       setShowHistoryModal(true)
  //     } catch (error) {
  //       console.error(error)
  //       toast.error('Failed to fetch history data')
  //     }
  //   }

  //   const closeHistoryModal = () => {
  //     setShowHistoryModal(false)
  //     setHistoryData([])
  //   }

  useEffect(() => {
    fetchProductsStock()
    fetchWarehouses() // Memanggil fetchWarehouses saat komponen dimuat
  }, [warehouseFilter])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tabel Report</h1>
      <div className="mb-4">
        <label
          htmlFor="warehouseFilter"
          className="block text-gray-700 font-bold"
        >
          Filter by Warehouse:
        </label>
        <select
          id="warehouseFilter"
          name="warehouseFilter"
          className="block w-full mt-1 p-2 border rounded-md"
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
        >
          <option value="">All Warehouses</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-full w-full table-auto">
          <thead>
            <tr className="bg-blue-700 text-white">
              {headTabel.map((header, index) => (
                <th key={index} className="p-3 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } text-left`}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{product?.Warehouse.name}</td>
                <td className="p-3">{product?.Product.name}</td>
                <td className="p-3">{product?.stock}</td>
                <td className="p-3">
                  <button
                    // onClick={() => openHistoryModal(product)}
                    className="bg-blue-500 hover-bg-blue-600 text-white px-3 py-2 rounded-md ml-2"
                  >
                    Detail Stock History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {showHistoryModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Product History</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((history, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}
                  >
                    <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                      {history.createdAt}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                      {history.action}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                      {history.quantity}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                      {history.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={closeHistoryModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover-bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
      <ToastContainer />
    </div>
  )
}

export default Report
