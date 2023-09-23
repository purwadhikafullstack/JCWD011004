import React from 'react'
import { Link } from 'react-router-dom'

function Card({ product }) {
  const stock = product?.Warehouse_Products
    ? product?.Warehouse_Products[0]?.stock
    : 0
  const isProductActive = stock > 0
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="p-3 m-3 bg-white rounded-lg shadow-lg w-40 lg:w-56 h-auto hover:border border-gray-300 transition duration-300 ease-in-out">
          <Link to={`/product/detail/${product?.productId || product?.id}`}>
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
          </Link>
          <div className="pb-3 text-center">
            <button
              className={`px-4 py-2 rounded-full focus:outline-none ${
                isProductActive
                  ? 'bg-orange-300 text-black hover:bg-orange-400'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!isProductActive}
              onClick={() => {
                if (isProductActive) {
                  alert('Item added to cart!')
                } else {
                  alert('This item is Sold Out')
                }
              }}
            >
              {isProductActive ? 'Add to Cart' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Card
