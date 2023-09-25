import React, { useState, useEffect } from 'react'
import { UploadButton } from '../../components/button/button'
import axios from 'axios'

export default function TableDashboardPemesanan() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction/all-status/2'
      )
      setData(response.data.allOrderStatus)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-h1-mobile lg:text-hr-desktop mb-4">
        Daftar Pemesanan
      </h1>
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
          {data.map((order, orderIndex) =>
            order.Products.map((product, productIndex) => (
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
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4 ml-14">
        <UploadButton text="Upload Bukti Bayar" productId={4} />
      </div>
    </div>
  )
}
