import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const apiUrl = process.env.REACT_APP_API_BASE_URL

const TabelStock = () => {
  const headTable = ['No', 'Warehouse', 'Product', 'Stock', 'Actions']
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [editQuantity, setEditQuantity] = useState(0)
  const [editDescription, setEditDescription] = useState('')
  const [editAction, setEditAction] = useState('increment')
  const [updateStock, setUpdateStock] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [historyData, setHistoryData] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [admin, setAdmin] = useState()
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [currentPage] = useState(0)
  const itemsPerPage = 10

  const fetchProducts = async () => {
    try {
      if (admin?.userInfo?.roleId === 1) {
        const response = await axios.get(
          `${apiUrl}/stock/getAllStock?warehouseId=${selectedWarehouse}`
        )
        setProducts(response?.data)
      } else if (admin?.userInfo?.roleId === 2) {
        const userId = admin?.userInfo?.id
        const response = await axios.get(
          `${apiUrl}/stock/getAllStockWarehouse/${userId}`
        )
        setProducts(response?.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/warehouse/get-all`)
      setWarehouses(response?.data?.data?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/admin/info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setAdmin(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (!admin) {
      fetchAdmin()
    }
  }, [admin])

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
  }

  const closeHistoryModal = () => {
    setShowHistoryModal(false)
  }

  const openEditModal = (product) => {
    setSelectedProduct(product)
    setEditQuantity(0)
    setEditDescription('')
    setEditAction('increment')
    setShowEditModal(true)
  }

  const openHistoryModal = async (product) => {
    try {
      const response = await axios.get(
        `${apiUrl}/stock/journals-product/${product.id}`
      )
      setHistoryData(response?.data)
      setSelectedProduct(product)
      setShowHistoryModal(true)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch product history.')
    }
  }

  const handleEdit = async () => {
    if (!editQuantity || !editDescription) {
      toast.error('Please fill in all fields')
      return
    }

    if (editAction === 'decrement' && editQuantity > selectedProduct.stock) {
      toast.error('Cannot decrement more than the current stock', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      return
    }
    setIsLoading(true)

    try {
      const response = await axios.post(
        `${apiUrl}/stock/create-stock-journal`,
        {
          warehouseId: selectedProduct.warehouseId,
          warehouseProductId: selectedProduct.id,
          quantity: editAction === 'decrement' ? editQuantity : editQuantity,
          description: editDescription,
          action: editAction
        }
      )

      toast.success('Edit successful', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setUpdateStock(!updateStock)
      console.log('Response:', response.data)
      closeEditModal()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderWarehouseOptions = () => {
    return warehouses.map((warehouse) => (
      <option key={warehouse.id} value={warehouse.id}>
        {warehouse.name}
      </option>
    ))
  }

  useEffect(() => {
    if (admin) {
      fetchProducts()
      fetchWarehouses()
    }
  }, [admin, updateStock, selectedWarehouse])

  const offset = currentPage * itemsPerPage
  const currentData = historyData.slice(offset, offset + itemsPerPage)

  return (
    <div className="w-full">
      {admin?.userInfo?.roleId === 1 && (
        <div className="mb-4">
          <label
            htmlFor="warehouseFilter"
            className="block text-lg font-medium text-gray-700"
          >
            Warehouse Filter
          </label>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label className="text-lg font-semibold">
              Filter by Warehouse:
            </label>
            <select
              value={selectedWarehouse}
              onChange={handleWarehouseChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Warehouses</option>
              {renderWarehouseOptions()}
            </select>
          </div>
        </div>
      )}
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-yellow-500 text-white">
            {headTable.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-center text-sm font-semibold border border-white"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                {index + 1}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                {product?.Warehouse?.name}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                {product?.Product.name}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                {product.stock}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 border border-white">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openHistoryModal(product)}
                  className="bg-gray-500 text-white px-2 py-1 rounded-md hover-bg-gray-600 ml-2"
                >
                  History
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form className="text-left">
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={selectedProduct?.Product.name}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editQuantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="editQuantity"
                  name="editQuantity"
                  value={editQuantity}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const inputValue = parseInt(e.target.value, 10)
                    if (!isNaN(inputValue)) {
                      setEditQuantity(Math.max(inputValue, 0))
                    } else {
                      setEditQuantity(0)
                    }
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="editDescription"
                  name="editDescription"
                  value={editDescription}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editAction"
                  className="block text-sm font-medium text-gray-700"
                >
                  Action
                </label>
                <select
                  id="editAction"
                  name="editAction"
                  value={editAction}
                  onChange={(e) => setEditAction(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="increment">Increment</option>
                  <option value="decrement">Decrement</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className={`${
                    isLoading
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-blue-500 text-white'
                  } px-4 py-2 rounded-md ${
                    isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover-bg-red-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showHistoryModal && (
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
                {currentData.map((history, index) => (
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
      )}
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  )
}

export default TabelStock
