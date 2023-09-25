import React from 'react'

function CheckOutCart() {
  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">$129.99</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$4.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">$134.98 USD</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-md bg-orange-300 py-1.5 font-medium text-blue-50 hover:bg-orange-600 active:bg-orange-300">
        Check out
      </button>
    </div>
  )
}

export default CheckOutCart
