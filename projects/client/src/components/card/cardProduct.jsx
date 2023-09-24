import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './components/AddToCartButton'

function Card({ product }) {
  console.log(product)
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
            <AddToCartButton
              isProductActive={isProductActive}
              productId={product?.id}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
