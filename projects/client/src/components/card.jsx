// AddToCartCard.js

import React from 'react'

function Card() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="p-3 m-3 bg-white rounded-lg shadow-lg w-40 lg:w-56 h-auto hover:border border-gray-300 transition duration-300 ease-in-out">
          <a href="#">
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
          </a>
          <div className="pb-3 text-center">
            <button
              className="px-4 py-2 bg-orange-300 text-gray rounded hover:bg-orange-400 focus:outline-none"
              onClick={() => {
                alert('Item added to cart!')
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
