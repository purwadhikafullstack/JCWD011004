import React, { useState } from 'react'

const CategoriesReport = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [category, setCategory] = useState('Umur')

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleChangeCategory = (item) => {
    setCategory(item)
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          id="dropdown-button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          {category}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            id="dropdown-menu"
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              className="py-2 p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <a
                href="#"
                className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100"
                role="menuitem"
                onClick={() => {
                  handleChangeCategory('Umur')
                }}
              >
                Umur
              </a>
              <a
                href="#"
                className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100"
                role="menuitem"
                onClick={() => {
                  handleChangeCategory('Pendidikan')
                }}
              >
                Pendidikan
              </a>
              <a
                href="#"
                className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100"
                role="menuitem"
                onClick={() => {
                  handleChangeCategory('Gizi')
                }}
              >
                Gizi
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CategoriesReport
