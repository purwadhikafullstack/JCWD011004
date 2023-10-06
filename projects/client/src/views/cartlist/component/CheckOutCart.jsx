import React from 'react'
import { useSelector } from 'react-redux'

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number)
}

function CheckOutCart() {
  const subTotal = useSelector((state) => state.cartItems.totalItemPrice)
  const totalAmount = subTotal?.reduce((total, item) => {
    return item.totalPrice * item.quantity + total
  }, 0)
  const formattedSubTotal = formatRupiah(totalAmount)
  return (
    <div className=" h-fit rounded-lg border bg-white p-6 shadow-md">
      {/* <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal&nbsp;</p>
        <p className="text-gray-700">{formattedSubTotal}</p>
      </div> */}
      {/* <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$4.99</p>
      </div> */}
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 ml-1 text-lg font-bold">{formattedSubTotal}</p>
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
