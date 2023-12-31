import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import GeneralPagination from '../../../pagination/GeneralPagination'
import { ToastContainer, toast } from 'react-toastify'

export default function TableDashboardPemesananDelivery() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // number of items to show per page
  const token = jwt_decode(localStorage.getItem('token'))
  const userId = token ? token.id : null
  //eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const fetchData = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `${apiUrl}/transaction/all-status?userId=${userId}&transactionStatusId=3`
        )
        setData(response.data.allOrderStatus)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleConfirm = async (transactionId) => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.patch(
        `${apiUrl}/transaction/status/${transactionId}`,
        {
          transactionStatusId: 4
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (data.success) {
        const toastId = toast.success('Packet received. Thankyou!', {
          position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
          fetchData()
        }, 2000)
      }
    } catch (error) {
      const toastId = toast.error('Failed to confirm', {
        position: toast.POSITION.TOP_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl lg:text-xl md:text-lg sm:text-sm font-semibold text-h1-mobile lg:text-hr-desktop mb-4">
        Daftar Pemesanan
      </h1>

      {currentItems.length === 0 ? (
        <div>
          <p className="text-pr-mobile h-screen lg:text-pr-desktop font-medium text-gray-500 text-pr-mobile lg:text-pr-desktop">
            Tidak ada daftar transaksi barang.
          </p>
        </div>
      ) : (
        <>
          {currentItems?.map((order, orderIndex) => (
            <div key={`order_${orderIndex}`}>
              <table className="min-w-full divide-y divide-gray-200 border-4 mt-2">
                <thead>
                  <div className=" bg-orange-400 text-pr-mobile shadow-sm rounded font-bold  lg:text-pr-desktop">
                    <p>Transaction ID: {order?.id}</p>
                  </div>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-pr-mobile font-medium lg:text-pr-desktop text-gray-500 uppercase tracking-wider">
                      Nama Barang
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-pr-mobile lg:text-pr-desktop font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pr-mobile lg:text-pr-desktop text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pr-mobile lg:text-pr-desktop text-gray-500 uppercase tracking-wider">
                      Total Harga
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order?.Transaction_Items?.map((e, i) => {
                    return (
                      <tr key={i} className="bg-white hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                          {e.Product?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                          {e?.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                          {order?.transactionStatusId === 3
                            ? 'Order Sedang Dikirim'
                            : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                          {e?.totalPrice}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="flex justify-center">
                <button
                  className={`flex items-center justify-center px-2 py-1 rounded bg-orange-400 text-white hover:bg-orange-600 focus:outline-none focus:ring focus:ring-green-300`}
                  style={{ width: '170px' }}
                  onClick={() => handleConfirm(order?.id)}
                >
                  Confirm
                </button>
              </div>
            </div>
          ))}
          <GeneralPagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
      <ToastContainer />
    </div>
  )
}
