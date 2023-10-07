import React from 'react'
import SidebarBody from './components/SidebarBody'
import AvatarUploadAdmin from './components/AvatarUploadAdmin'
function SidebarHead({ isSidebarOpen }) {
  return (
    <>
      {' '}
      <aside
        className={`${
          isSidebarOpen ? '' : 'ml-[-100%]'
        } fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300  lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] `}
      >
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <h1 className="flex text-2xl font-bold">Sakata</h1>
            </a>
          </div>

          <div className="mt-8 text-center">
            <AvatarUploadAdmin />
            <h5 className="mt-4 text-xl font-semibold text-gray-600 lg:block">
              Ini Admin
            </h5>
            <span className="text-gray-400 lg:block">Role Admin</span>
          </div>

          <SidebarBody />
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default SidebarHead
