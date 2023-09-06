import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { RxAvatar } from 'react-icons/rx'
import { AiOutlineHeart } from 'react-icons/ai'

function Navbar() {
  return (
    <div className="container mx-auto max-w-screen-lg fixed top-0 bg-gray-900 text-white px-7 py-5 z-50">
      <nav>
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-semibold">AKUI</div>
            <div className="flex space-x-6 items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-white px-3 py-1 rounded-lg focus:outline-none hover:border border-gray-500"
              />
              <ul className="flex space-x-6">
                <li className="flex justify-between items-center hover:text-gray-400 transition duration-300 ease-in-out">
                  <AiOutlineHeart /> Liked
                </li>
                <li className="flex justify-between items-center hover:text-gray-400 transition duration-300 ease-in-out">
                  <FiShoppingCart /> Cart
                </li>
                <li className="flex justify-between items-center hover:text-gray-400 transition duration-300 ease-in-out">
                  <RxAvatar /> Profile
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
