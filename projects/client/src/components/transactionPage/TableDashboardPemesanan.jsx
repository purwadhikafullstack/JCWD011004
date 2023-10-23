import React, { useState, useEffect } from 'react'
import { UploadButton } from '../../components/button/button'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import GeneralPagination from '../pagination/GeneralPagination'

export default function TableDashboardPemesanan() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // number of items to show per page
  const [updateFetchData, setUpdateFetchData] = useState(false)
  const token = jwt_decode(localStorage.getItem('token'))
  const userId = token ? token.id : null

  // eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handleLoading = () => {
    setLoading(!loading)
  }

  const handleCancel = () => {
    setLoading(!loading)
  }

  const fetchData = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `${apiUrl}/transaction/all-status?userId=${userId}&transactionStatusId=0`
        )
        setData(response?.data?.allOrderStatus)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId, loading, updateFetchData])

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
        <div>
          {currentItems?.map((order, orderIndex) => (
            <div key={`order_${orderIndex}`}>
              <table className="min-w-full divide-y divide-gray-200 border-4 flex-grow mt-2">
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
                          {e?.Product?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                          {e?.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                          {order?.transactionStatusId ? '' : 'Belum Bayar'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                          {e?.totalPrice}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className=" border-4 flex max-sm:w-1">
                <UploadButton
                  updatedFetch={setUpdateFetchData}
                  dataUpdate={updateFetchData}
                  text="Upload Bukti Bayar"
                  transactionId={order.id}
                  userId={userId}
                  loading={handleLoading}
                  cancel={handleCancel}
                />
              </div>
            </div>
          ))}
          <GeneralPagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  )
}
