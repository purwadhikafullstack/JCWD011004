import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TabelSuperAdmin = () => {
  const headTable = [
    'No',
    'Warehouse',
    'Product',
    'Buyer',
    'Quantity',
    'Status',
    'Total Price',
    'Action'
  ]

  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/admin/all-transaction'
      )
      console.log(response.data.allTransaction)
      setData(response?.data?.allTransaction)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="text-center">
            {headTable.map((item, index) => (
              <th
                key={index}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.id}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item?.Warehouse?.name}{' '}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item?.Product?.name}{' '}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.quantity}{' '}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.status}{' '}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.totalPrice}{' '}
              </td>
              <td className="px-5 py-2 sm:py-5 border-b border-gray-200 bg-white text-sm">
                {item.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TabelSuperAdmin
