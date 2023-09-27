import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'

function CartSort({ onSortChange, fetchData }) {
  const options = ['newest', 'oldest', 'highest', 'lowest']

  const [selectedOption, setSelectedOption] = useState(options[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleChangeMenu = (option) => {
    setSelectedOption(option)
    onSortChange(option) // Panggil fungsi onSortChange saat opsi dipilih
    setIsDropdownOpen(false) // Tutup dropdown setelah memilih opsi
    fetchData()
  }

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="relative inline-flex md:justify-end  max-[768px]:mx-auto">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 "
          id="sort-options-menu"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          onClick={handleToggleDropdown}
        >
          Sort:&nbsp;{selectedOption}&nbsp;
          {selectedOption === 'highest' || selectedOption === 'lowest'
            ? 'price'
            : ''}
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="sort-options-menu"
          style={{
            top: '30px'
          }}
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleChangeMenu(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CartSort
