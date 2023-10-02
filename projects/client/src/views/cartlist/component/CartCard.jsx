import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function CartCard({ item, handleOpenShowModalDelete, handleSubTotal }) {
  const [quantity, setQuantity] = useState(item?.quantity)
  const [formattedPrice, setFormattedPrice] = useState(
    item?.totalPrice * quantity
  )
  const [isDisabled, setIsDisabled] = useState(false)
  const [productImage, setProductImage] = useState(null)
  console.log(productImage)
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const handleIncrease = async () => {
    setIsDisabled(true)
    setQuantity(quantity + 1)
    setFormattedPrice((quantity + 1) * item?.totalPrice)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${apiUrl}/cart/update-item`,
        { productId: item?.productId, quantity: quantity + 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      response.status === 200 && setIsDisabled(false)
    } catch (error) {
      setIsDisabled(false)
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const handleDecrease = async () => {
    if (quantity > 1) {
      setIsDisabled(true)
      setQuantity(quantity - 1)
      setFormattedPrice((quantity - 1) * item?.totalPrice)
      try {
        const token = localStorage.getItem('token')
        const response = await axios.patch(
          `${apiUrl}/cart/update-item`,
          { productId: item?.productId, quantity: quantity - 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        response.status === 200 && setIsDisabled(false)
      } catch (error) {
        setIsDisabled(false)
        toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    } else {
      handleOpenShowModalDelete(item?.Product)
    }
  }

  const handleCheckList = (event) => {
    const checkListItem = {
      productId: item?.productId,
      totalPrice: item?.totalPrice
    }

    handleSubTotal(checkListItem, event.target.checked)
  }

  const handleProductImage = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${apiUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProductImage(response?.data?.Product_Images[0]?.image)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    item && handleProductImage(item?.Product?.id)
  }, [])
  return (
    <div className="justify-between  mb-6 max-[640px]:flex-col max-[640px]:gap-4 rounded-lg bg-white p-10 shadow-md sm:flex sm:justify-start overflow-x-scroll relative">
      <img
        src={productImage}
        alt="product-image"
        className="w-40 h-40 rounded-lg max-[640px]:content-center inline-block "
      />
      <div className="gap-10 sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">
            {item?.Product?.name}
          </h2>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <button
              disabled={isDisabled}
              onClick={handleDecrease}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {' '}
              -{' '}
            </button>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none focus:outline-none"
              type="text"
              value={quantity}
              min="1"
            />
            <button
              disabled={isDisabled}
              onClick={handleIncrease}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {' '}
              +{' '}
            </button>
          </div>
          <div className="flex items-center w-auto space-x-4">
            <p className="text-sm">Rp&nbsp;{formattedPrice}</p>
            <button onClick={() => handleOpenShowModalDelete(item?.Product)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <label>
          <input onChange={handleCheckList} type="checkbox" />
        </label>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CartCard
