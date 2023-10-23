import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCheckout } from '../../../services/reducer/checkoutReducer'
import CheckoutAddress from '../../../components/checkout/CheckoutAddress'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { setCount } from '../../../services/reducer/cartReducer'

const apiUrl = process.env.REACT_APP_API_BASE_URL

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
  const { userData } = useSelector((state) => state.dataAddress.allAddress)
  const addressDataId = useSelector((state) => state.dataAddress.addressDataId)
  const dataCourier = useSelector((state) => state.dataCourier.courier)
  const navigate = useNavigate()

  const userAddress = userData?.filter((item) => item.id == addressDataId)

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

  const productIdArray = subTotal?.map((item) => item.productId)

  const combinedDataAddress =
    userAddress && userAddress[0]
      ? [
          userAddress[0]?.address,
          userAddress[0]?.subdistrict,
          userAddress[0]?.cityRegency,
          userAddress[0]?.province,
          userAddress[0]?.postalcode,
          userAddress[0]?.phone
        ].join(', ')
      : ''

  const warehouseId = dataCourier?.nearestWarehouse?.id

  const total = totalAmount + shipping

  const formattedSubTotal = formatRupiah(totalAmount)
  const formattedShippingCost = formatRupiah(shipping)

  const formattedTotal = formatRupiah(total)

  const handleCreateOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${apiUrl}/transaction/order`,
        {
          warehouseId: warehouseId,
          totalItemPrice: totalAmount,
          shippingCost: shipping,
          totalPrice: total,
          shippingAddress: combinedDataAddress,
          paymentMethod: 'transfer',
          paymentProof: 'test',
          checkedProductId: productIdArray
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        toast.success('Yey!! Your transaction succesfully created', {
          position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
          dispatch(setCount(0))
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setIsButtonDisabled(subTotal.length === 0)
  }, [subTotal])

  return (
    <div>
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
                onClick={() => {
                  handleCreateOrder()
                }}
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
      <ToastContainer />
    </div>
  )
}

export default CheckOutCart
