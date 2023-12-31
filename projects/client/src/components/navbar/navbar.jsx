import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import ButtonLoginRegister from '../homePage/buttonLoginRegister'
import { useSelector } from 'react-redux'
import { AvatarDropdown } from './profile'
import CartIcons from '../cart/CartIcons'
function Navbar() {
  const stateToken = useSelector((state) => state.dataProduct.isLogin)

  return (
    <div className="container mx-auto max-w-screen-lg fixed top-0 bg-gray-900 text-white px-7 py-5 z-50">
      <nav>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold">
              <a href="/">AKUI</a>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center">
              <input
                type="text"
                placeholder="Search Product..."
                className="bg-gray-700 text-white px-3 py-1 rounded-lg focus:outline-none hover:border border-gray-500"
              />
              <ul className="flex space-x-6">
                {stateToken && (
                  <>
                    <li className="flex flex-col md:flex-row justify-between items-center hover:text-gray-400 transition duration-300 ease-in-out">
                      <AiOutlineHeart className="md:mr-2" />
                      Wishlist
                    </li>
                    <a href="/cart">
                      <li className="flex flex-col md:flex-row justify-between items-center hover:text-gray-400 transition duration-300 ease-in-out">
                        <CartIcons />
                        Cart
                      </li>
                    </a>
                  </>
                )}
                <li className="flex flex-col md:flex-row justify-between items-center hover:text-gray-400 transition duration-300 ease-in-out">
                  {stateToken ? (
                    <>
                      <AvatarDropdown />
                    </>
                  ) : (
                    <ButtonLoginRegister />
                  )}
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
