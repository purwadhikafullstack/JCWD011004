import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function TableDashboardPemesanan() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction/all-status/2'
      )
      setData(response.data.allOrderStatus)
      console.log(response.data.allOrderStatus)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="w-full">
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Nama Barang
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Jumlah
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Status
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Total Harga
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Upload Bukti Bayar
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, orderIndex) =>
            // Iterasi melalui semua produk dalam pesanan
            order.Products.map((product, productIndex) => (
              <tr
                key={`order_${orderIndex}_product_${productIndex}`}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {product.name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {product.Transaction_Item?.quantity}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {order.transactionStatusId}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {product.Transaction_Item?.totalPrice}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <a href="#">
                    <input type="file" id="file-input" name="ImageStyle" />
                    <button
                      className={`bg-orange-200 py-1 px-3 rounded-lg hover:bg-orange-500 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleClick}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Uploading...' : 'Upload'}
                    </button>
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
