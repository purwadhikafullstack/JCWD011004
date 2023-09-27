import React, { useState, useEffect } from 'react'
import { UploadButton } from '../../components/button/button'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default function TableDashboardPemesanan() {
  const [data, setData] = useState([])
  const token = jwt_decode(localStorage.getItem('token'))
  const userId = token ? token.id : null

  const fetchData = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `http://localhost:8000/api/transaction/all-status?userId=${userId}&transactionStatusId=0`
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
        <p className="text-pr-mobile lg:text-pr-desktop font-medium text-gray-500">
          Tidak ada daftar transaksi barang.
        </p>
      ) : (
        <>
          {data.map((order, orderIndex) => (
            <div key={`order_${orderIndex}`}>
              {/* Informasi transaksi */}
              <p>Transaction ID: {order.id}</p>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
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
                        {order?.transactionStatusId ? '' : 'Belum Bayar'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-pr-mobile lg:text-pr-desktop font-sm">
                        {product?.Transaction_Item?.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 ml-14">
                <UploadButton
                  text="Upload Bukti Bayar"
                  transactionId={order.id}
                  userId={userId}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
