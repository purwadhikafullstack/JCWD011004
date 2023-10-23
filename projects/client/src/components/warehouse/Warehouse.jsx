import axios from 'axios'
import { useState, useEffect } from 'react'
import Table from './component/Table'
import { Link } from 'react-router-dom'

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_BASE_URL

const Warehouse = () => {
  const [data, setData] = useState([])
  const [dta, setDta] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/warehouse/get-all?page=${currentPage}&limit=10`
      )
      setDta(response?.data)
      setData(response?.data?.data?.data)
      setTotalPages(Math.ceil(response?.data?.data?.totalItems / 10))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">Warehouse</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="lg:ml-40 ml-10 space-x-8">
            <Link to="/create-warehouse">
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                Create New
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <Table data={data} key="tab" />
          </div>
        </div>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing {(currentPage - 1) * 10 + 1} to{' '}
            {Math.min(currentPage * 10, dta?.data?.totalItems)}
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
              onClick={handlePrevPage}
            >
              Prev
            </button>
            &nbsp; &nbsp;
            <button
              className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Warehouse
