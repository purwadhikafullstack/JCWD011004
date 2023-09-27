import React from 'react'
import TableDashboardPemesanan from './TableDashboardPemesanan'
import Navbar from '../navbar/navbar'
import Footer from '../homePage/footer'

export default function SidebarPemesanan() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Navbar />
      <div className="h-screen flex flex-col container mx-auto max-w-screen-lg mt-20">
        <div
          id="view"
          className="h-full w-full flex flex-col md:flex-row shadow-lg bg-white border border-neutral-200"
        >
          <div
            id="sidebar"
            className="bg-white md:block shadow-xl px-3 w-full md:w-1/4 lg:w-1/4 overflow-x-hidden transition-transform duration-300 ease-in-out border border-neutral-200"
          >
            <div className="space-y-6 md:space-y-10 mt-10">
              <div id="menu" className="flex flex-col space-y-2">
                <a
                  href="/sidebar-pemesanan"
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out bg-orange-500 text-white"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FF5733"
                  >
                    <path d="M12 2C5.382 2 0 7.382 0 14s5.382 12 12 12 12-5.382 12-12S18.618 2 12 2zm0 21c-5.523 0-10-4.477-10-10S6.477 3 12 3s10 4.477 10 10-4.477 10-10 10z" />
                    <path d="M13 8a1 1 0 000-1v3a1 1 0 000 2V9a1 1 0 000-1z" />
                  </svg>
                  <span className="text-pr-mobile font-sm lg:text-pr-desktop">
                    Not Paid Yet
                  </span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                  </svg>
                  <span className="">Waiting for Confirmation</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="">In Progress</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#000000"
                  >
                    <path d="M21 5h-1V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM4 5v1h16V5H4zm16 14H4V7h16v12z" />
                    <path d="M6 9h12v2H6zm0 4h7v2H6z" />
                  </svg>
                  <span className="">Shipped</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm3 0a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                    ></path>
                  </svg>
                  <span className="">Received</span>
                </a>
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FF5733"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-5.382 10-12S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M16.293 7.293a.999.999 0 0 0-1.414 0L12 10.586 9.121 7.707a.999.999 0 1 0-1.414 1.414L10.586 12l-2.879 2.879a.999.999 0 1 0 1.414 1.414L12 13.414l2.879 2.879a.997.997 0 0 0 1.414 0c.39-.39.39-1.024 0-1.414L13.414 12l2.879-2.879c.39-.39.39-1.024 0-1.414z" />
                  </svg>
                  <span>Cancelled</span>
                </a>
              </div>
            </div>
          </div>
          <div>
            <TableDashboardPemesanan />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
