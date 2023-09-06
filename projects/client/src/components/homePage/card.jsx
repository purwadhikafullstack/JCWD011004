// AddToCartCard.js

import React from 'react'

function Card() {
  return (
    <div className="flex items-center justify-center">
      <div className="m-3 bg-white rounded-lg shadow-lg p-4 w-56 h-auto hover:border border-gray-300 transition duration-300 ease-in-out">
        <img
          src="/card/chair.png"
          alt="Product Image"
          className="m-auto w-36 h-36 object-cover rounded-t-lg"
        />
        <div className="p-4 text-center">
          <h2 className="mb-4 text-xl font-semibold">Product Title</h2>
          <p className="mb-4 text-gray-600 truncate">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            reiciendis ullam.
          </p>
          <p className="mb-4 text-m font-bold">IDR 300.000</p>
          <button className="px-4 py-2 bg-orange-300 text-gray rounded hover:bg-orange-400 focus:outline-none">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
