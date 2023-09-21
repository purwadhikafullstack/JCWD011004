import React from 'react'

function AddToCartButton() {
  return (
    <button
      className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
      onClick={() => {
        alert('Item added to cart!')
      }}
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton
