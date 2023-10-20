import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
//eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL

const Report = () => {
  const [warehouses, setWarehouses] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [stockHistory, setStockHistory] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [months] = useState([
    '2023-01',
    '2023-02',
    '2023-03',
    '2023-04',
    '2023-05',
    '2023-06',
    '2023-07',
    '2023-08',
    '2023-09',
    '2023-10',
    '2023-11',
    '2023-12'
  ])

  const [admin, setAdmin] = useState(null) // Tambahkan state untuk menyimpan informasi admin

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/warehouse/get-all`)
      setWarehouses(response?.data?.data?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchStockHistory = async () => {
    try {
      if (admin) {
        // Cek role admin
        const userId = admin?.userInfo?.id
        let response

        if (admin?.userInfo?.roleId === 1) {
          response = await axios.get(`${apiUrl}/history/history`, {
            params: { createdAt: selectedMonth, warehouseId: selectedWarehouse }
          })
        } else if (admin?.userInfo?.roleId === 2) {
          response = await axios.get(
            `${apiUrl}/history/history-warehouse/${userId}`,
            {
              params: {
                createdAt: selectedMonth,
                warehouseId: selectedWarehouse
              }
            }
          )
        }

        setStockHistory(response?.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

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

  useEffect(() => {
    fetchWarehouses()
  }, []) // Run once to fetch warehouses

  useEffect(() => {
    fetchAdmin()
  }, []) // Fetch admin information

  useEffect(() => {
    if (admin) {
      fetchStockHistory()
    }
  }, [selectedWarehouse, selectedMonth])

  const openModal = (warehouse) => {
    setSelectedWarehouse(warehouse)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedWarehouse(null)
    setStockHistory([])
    setShowModal(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">List of Warehouses</h1>
      <div className="bg-white shadow-md rounded-lg my-6 overflow-x-auto">
        <table className="min-w-full w-full table-auto">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-3">No</th>
              <th className="p-3">Warehouse Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse, index) => (
              <tr
                key={warehouse.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } text-center`}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{warehouse.name}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => openModal(warehouse.id)}
                  >
                    Detail Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedWarehouse && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-900 opacity-50"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white w-3/4 max-w-screen-lg rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                Stock History for {selectedWarehouse.name}
              </h2>

              {/* Custom dropdown for selecting a month */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select a Month
                </label>
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  >
                    <option value="">Select a Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.293 7.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 9.414l-4.293 4.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-blue-700 text-white">
                    <th className="p-3">No</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Initial Stock</th>
                    <th className="p-3">Total Addition</th>
                    <th className="p-3">Total Subtraction</th>
                    <th className="p-3">Total Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {stockHistory?.map((history, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{history?.productName}</td>
                      <td className="p-3">{history?.description}</td>
                      <td className="p-3">{history?.initialStock}</td>
                      <td className="p-3">{history?.totalAddition}</td>
                      <td className="p-3">{history?.totalSubtraction}</td>
                      <td className="p-3">{history?.endingStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-100 text-right">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Report
