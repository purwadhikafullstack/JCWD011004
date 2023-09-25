import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginModal from '../../loginModal/loginModal'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { increment } from '../../../services/reducer/cartReducer'

function AddToCartButton({ isProductActive, productId }) {
  const [openLoginModal, setLoginModalOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const dispatch = useDispatch()
  const handleLoginModal = () => {
    setLoginModalOpen(!openLoginModal)
  }

  const handleAddToCart = async () => {
    setIsDisabled(true)
    const token = localStorage.getItem('token')
    !token
      ? (() => {
          setLoginModalOpen(true)
          toast.error('Silahkan login terlebih dahulu', {
            position: toast.POSITION.TOP_CENTER
          })
          setIsDisabled(false)
        })()
      : axios
          .post(
            `${apiUrl}/cart/additem`,
            {
              productId: productId
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            dispatch(increment(productId)) // increment the count in the Redux store
            toast.success('Product ditambahkan di keranjang', {
              position: toast.POSITION.TOP_CENTER
            })
            setIsDisabled(false)
          })
          .catch((error) => {
            console.log(error)
            toast.error('Terjadi masalah saat menambahkan item', {
              position: toast.POSITION.TOP_CENTER
            })
          })
  }

  useEffect(() => {
    isProductActive ? setIsDisabled(false) : setIsDisabled(true)
  }, [])

  return (
    <>
      <button
        disabled={isDisabled}
        className={`px-4 py-2 rounded-full focus:outline-none ${
          isProductActive
            ? 'bg-orange-300 text-black hover:bg-orange-400'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
        onClick={handleAddToCart}
      >
        {isProductActive ? 'Add to Cart' : 'Sold Out'}
      </button>
      <LoginModal isOpen={openLoginModal} onClose={handleLoginModal} />
      <ToastContainer />
    </>
  )
}

export default AddToCartButton
