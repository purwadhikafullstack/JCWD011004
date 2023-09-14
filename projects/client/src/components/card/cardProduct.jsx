import React from 'react'
import { Link } from 'react-router-dom'

function Card() {
  const handleAddToCart = () => {
    alert('Item added to cart!')
  }

  return (
    <div className="flex items-center justify-center">
      <Link to="/product/:id">
        <div className="p-3 m-3 bg-white rounded-lg shadow-lg w-40 lg:w-56 h-auto hover:border border-gray-300 transition duration-300 ease-in-out">
          <div className="p-3">
            <img
              src="/card/chair.png"
              alt="Product Image"
              className="m-auto w-36 h-36 object-cover rounded-t-lg"
            />
          </div>
          <div className="text-center">
            <h2 className="mb-4 text-xl font-semibold">Product Title</h2>
            <p className="mb-4 text-gray-600 truncate">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              reiciendis ullam.
            </p>
            <p className="mb-4 text-m font-bold">IDR 300.000</p>
          </div>
          <div className="pb-3 text-center">
            <button
              className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
