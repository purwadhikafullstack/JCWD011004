import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function TableDashboardPemesanan() {
  const [isLoading, setIsLoading] = useState(false)
  // const [data, setData] = useState([])
  // const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    // setError(null)

    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction/all-status/2'
      )
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      // setError(error)
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
          <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Nama Barang
              </span>
              KnobHome
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Jumlah
              </span>
              German
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Status
              </span>
              <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">
                deleted
              </span>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Total Harga
              </span>
              $100S
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Upload
              </span>
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
        </tbody>
      </table>
    </div>
  )
}
