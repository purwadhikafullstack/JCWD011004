import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCheckout } from '../../../services/reducer/checkoutReducer'
import CheckoutAddress from '../../../components/checkout/CheckoutAddress'

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number)
}

function CheckOutCart() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const isCheckout = useSelector((state) => state.checkoutData.isCheckout)
  const selectedCourier = useSelector(
    (state) => state.dataCourier.selectedCourierData
  )
  const dispatch = useDispatch()
  const handleCheckout = (data) => {
    if (data === true) {
      if (subTotal.length > 0) {
        dispatch(setIsCheckout(true))
      }
    } else {
      window.location.reload()
    }
  }

  const subTotal = useSelector((state) => state.cartItems.totalItemPrice)
  const totalAmount = subTotal?.reduce((total, item) => {
    return item.totalPrice * item.quantity + total
  }, 0)
  const totalWeight = subTotal?.reduce((totalWeight, item) => {
    return item.weight * item.quantity + totalWeight
  }, 0)

  const shipping =
    selectedCourier && selectedCourier.cost && selectedCourier.cost[0]
      ? selectedCourier.cost[0].value
      : 0

  const formattedSubTotal = formatRupiah(totalAmount)
  const formattedShippingCost = formatRupiah(shipping)

  const formattedTotal = formatRupiah(totalAmount + shipping)

  useEffect(() => {
    setIsButtonDisabled(subTotal.length === 0)
  }, [subTotal])

  return (
    <div className=" w-auto h-fit rounded-lg border bg-white p-6 shadow-md">
      {isCheckout ? (
        <>
          <CheckoutAddress />
          <div className="text-right text-xs">
            <p>Subtotal {formattedSubTotal}</p>
            <p>Shipping {formattedShippingCost}</p>
            <p>Weight {totalWeight}kg</p>
          </div>
        </>
      ) : (
        ''
      )}
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="text-right">
          <p className="mb-1 ml-1 text-lg font-bold">{formattedTotal}</p>
          <p className="text-xs text-gray-700">including VAT</p>
        </div>
      </div>
      <div className="mt-10 flex justify-between">
        {isCheckout ? (
          <>
            <button
              className="flex-1 rounded-md bg-orange-300 py-1.5 font-medium text-blue-50 hover:bg-orange-600 active:bg-orange-300"
              onClick={() => {
                handleCheckout(false)
              }}
            >
              Cancel
            </button>
            <button
              disabled={!selectedCourier.cost}
              className={`flex-1 rounded-md ${
                !selectedCourier.cost
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-orange-300 hover:bg-orange-600 active:bg-orange-300 cursor-pointer'
              } py-1.5 font-medium text-blue-50 ml-2`}
            >
              Order
            </button>
          </>
        ) : (
          <button
            className={`flex-1 rounded-md ${
              isButtonDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-orange-300 hover:bg-orange-600 active:bg-orange-300 cursor-pointer'
            } py-1.5 font-medium text-blue-50 ml-2`}
            onClick={() => {
              if (!isButtonDisabled) {
                handleCheckout(true)
              }
            }}
            disabled={isButtonDisabled}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  )
}

export default CheckOutCart
