import React from 'react'
import { Link } from 'react-router-dom'

function Card({ product }) {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="p-3 m-3 bg-white rounded-lg shadow-lg w-40 lg:w-56 h-auto hover:border border-gray-300 transition duration-300 ease-in-out">
          <Link to="/product/:id" />
          <a href="#">
            <div className="p-3">
              <img
                src="/card/chair.png"
                alt="Product Image"
                className="m-auto w-36 h-36 object-cover rounded-t-lg"
              />
            </div>
            <div className="text-center">
              <h2 className="mb-4 text-xl font-semibold">
                {product?.name ? product?.name : product?.product?.name}
              </h2>
              <p className="mb-4 text-gray-600 truncate">
                {product?.description
                  ? product?.description
                  : product?.product?.description}
              </p>
              <p className="mb-4 text-m font-bold">
                IDR {product?.price ? product?.price : product?.product?.price}
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default Card
