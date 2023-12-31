import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './components/AddToCartButton'

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number)
}

function Card({ product }) {
  const totalStock = product.Warehouse_Products.reduce(
    (accumulator, product) => {
      return accumulator + (product.stock || 0)
    },
    0
  )

  const isProductActive = totalStock > 0

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="p-3 m-3 bg-white rounded-lg shadow-lg w-40 lg:w-56 h-auto hover:border border-gray-300 transition duration-300 ease-in-out">
          <Link
            to={{
              pathname: `/product/detail/${product?.productId || product?.id}`
            }}
          >
            <div className="p-3">
              <img
                src={product?.Product_Images[0]?.image}
                alt="Product Image"
                className="m-auto w-36 h-36 object-cover rounded-t-2xl"
              />
            </div>
            <div className="text-center">
              <h2 className="mb-1 font-semibold">{product?.name}</h2>
              <p className="mb-1 text-sm text-gray-600 truncate">
                {product?.description}
              </p>
              <p className="mb-1 text-xs text-gray-600 ">
                {totalStock == 0 || !totalStock
                  ? `Stock 0 `
                  : `Stock ${totalStock}`}
              </p>
              <p className="mb-3 text-sm font-bold">
                {formatRupiah(product?.price)}
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
