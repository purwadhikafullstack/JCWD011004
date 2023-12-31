import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
// eslint-disable-next-line
const baseUrl = process.env.REACT_APP_FE_BASE_URL

function SidebarBody() {
  const [activeLink, setActiveLink] = useState(window.location.href)
  const [admin, setAdmin] = useState()
  console.log(window.location.href)
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setAdmin(data?.userInfo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {' '}
      <ul className="space-y-2 tracking-wide mt-8">
        <li>
          <Link
            to="/admin/dashboard-report"
            onClick={() => setActiveLink(`${baseUrl}/admin/dashboard-report`)}
            aria-label="dashboard"
            className={`relative px-4 py-2 flex items-center space-x-4 rounded-xl ${
              activeLink === `${baseUrl}/admin/dashboard-report`
                ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                : 'text-gray-600 group'
            }`}
          >
            <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                className="fill-current text-orange-400 dark:fill-slate-600"
              ></path>
              <path
                d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                className="fill-current text-orange-200 group-hover:text-orange-300"
              ></path>
              <path
                d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                className="fill-current group-hover:text-orange-800"
              ></path>
            </svg>
            <span className="-mr-1 font-medium">Dashboard</span>
          </Link>
        </li>
        {admin?.roleId === 1 && (
          <li>
            <Link
              to="/admin/user"
              onClick={() => setActiveLink(`${baseUrl}/admin/user`)}
              className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
                activeLink === `${baseUrl}/admin/user`
                  ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                  : 'text-gray-600 group'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="fill-current text-gray-300 group-hover:text-orange-300"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <span className="group-hover:text-gray-700">User</span>
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/admin/product"
            onClick={() => setActiveLink(`${baseUrl}/admin/product`)}
            className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
              activeLink === `${baseUrl}/admin/product`
                ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                : 'text-gray-600 group'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className="fill-current text-gray-600 group-hover:text-orange-600"
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              />
              <path
                className="fill-current text-gray-300 group-hover:text-orange-300"
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
              />
            </svg>
            <span className="group-hover:text-gray-700">Product</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/category"
            onClick={() => setActiveLink(`${baseUrl}/admin/category`)}
            className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
              activeLink === `${baseUrl}/admin/category`
                ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                : 'text-gray-600 group'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className="fill-current text-gray-600 group-hover:text-orange-600"
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              />
              <path
                className="fill-current text-gray-300 group-hover:text-orange-300"
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
              />
            </svg>
            <span className="group-hover:text-gray-700">Category</span>
          </Link>
        </li>
        {admin?.roleId === 1 && (
          <li>
            <Link
              to="/admin/warehouse"
              onClick={() => setActiveLink(`${baseUrl}/admin/warehouse`)}
              className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
                activeLink === `${baseUrl}/admin/warehouse`
                  ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                  : 'text-gray-600 group'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-600 group-hover:text-orange-600"
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clipRule="evenodd"
                />
                <path
                  className="fill-current text-gray-300 group-hover:text-orange-300"
                  d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                />
              </svg>
              <span className="group-hover:text-gray-700">Warehouse</span>
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/admin/order"
            onClick={() => setActiveLink(`${baseUrl}/admin/order`)}
            className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
              activeLink === `${baseUrl}/admin/order`
                ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                : 'text-gray-600 group'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className="fill-current text-gray-600 group-hover:text-orange-600"
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              />
              <path
                className="fill-current text-gray-300 group-hover:text-orange-300"
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
              />
            </svg>
            <span className="group-hover:text-gray-700">Order</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/tabel-stock"
            onClick={() => setActiveLink(`${baseUrl}/admin/tabel-stock`)}
            className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
              activeLink === `${baseUrl}/admin/tabel-stock`
                ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                : 'text-gray-600 group'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className="fill-current text-gray-600 group-hover:text-orange-600"
                d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
              />
              <path
                className="fill-current text-gray-300 group-hover:text-orange-300"
                d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
              />
            </svg>
            <span className="group-hover:text-gray-700">Stock</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/report"
            onClick={() => setActiveLink(`${baseUrl}/admin/report`)}
            className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
              activeLink === `${baseUrl}/admin/report`
                ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                : 'text-gray-600 group'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7z"
              />
            </svg>
            <span className="group-hover:text-gray-700">Stock Report</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/report-sales"
            onClick={() => setActiveLink(`${baseUrl}/admin/report-sales`)}
            className={`px-4 py-2 flex items-center space-x-4 rounded-md ${
              activeLink === `${baseUrl}/admin/report-sales`
                ? 'text-white bg-gradient-to-r from-orange-800 to-orange-400'
                : 'text-gray-600 group'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7z"
              />
            </svg>
            <span className="group-hover:text-gray-700">Sales Report</span>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default SidebarBody
