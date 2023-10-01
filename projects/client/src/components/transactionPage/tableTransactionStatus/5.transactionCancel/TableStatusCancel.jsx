import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default function TableDashboardPemesananCancel() {
  const [data, setData] = useState([])
  const token = jwt_decode(localStorage.getItem('token'))
  const userId = token ? token.id : null
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const fetchData = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `${apiUrl}/transaction/all-status?userId=${userId}&transactionStatusId=5`
        )
        setData(response.data.allOrderStatus)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  return (
    <div className="w-full">
      <h1 className="text-2xl lg:text-xl md:text-lg sm:text-sm font-semibold text-h1-mobile lg:text-hr-desktop mb-4">
        Daftar Pemesanan
      </h1>

      {data.length === 0 ? (
        <div>
          <p className="text-pr-mobile lg:text-pr-desktop font-medium text-gray-500 text-pr-mobile lg:text-pr-desktop">
            Tidak ada daftar transaksi barang.
          </p>
        </div>
      ) : (
        <>
          {data.map((order, orderIndex) => (
            <div key={`order_${orderIndex}`}>
              <table className="min-w-full divide-y divide-gray-200 border-4 mt-2">
                <thead>
                  <div className=" bg-orange-400 text-pr-mobile shadow-sm rounded font-bold  lg:text-pr-desktop">
                    <p>Transaction ID: {order.id}</p>
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
                  {order.Products.map((product, productIndex) => (
                    <tr
                      key={`order_${orderIndex}_product_${productIndex}`}
                      className="bg-white hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                        {product?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                        {product?.Transaction_Item?.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                        {order?.transactionStatusId === 5 ? 'Cancel' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                        {product?.Transaction_Item?.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  )
}