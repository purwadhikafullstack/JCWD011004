import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginModal from '../../loginModal/loginModal'
import { useDispatch } from 'react-redux'
import { increment, fetchProducts } from '../../../services/reducer/cartReducer'
import { useSelector } from 'react-redux'

function AddToCartButton({ isProductActive, productId, quantity }) {
  const [openLoginModal, setLoginModalOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  // eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const dispatch = useDispatch()
  const { productIds } = useSelector((state) => state.cart)
  const handleLoginModal = () => {
    setLoginModalOpen(!openLoginModal)
  }
  const handleAddToCart = async () => {
    setIsDisabled(true)
    const token = localStorage.getItem('token')

    // Ensure productId is a number
    const productIdNumber = Number(productId)

    const payloadData = quantity
      ? { productId: productIdNumber, quantity: quantity }
      : { productId: productIdNumber }

    !token
      ? (() => {
          setLoginModalOpen(true)
          toast.error('Silahkan login terlebih dahulu', {
            position: toast.POSITION.TOP_CENTER
          })
          setIsDisabled(false)
        })()
      : axios
          .post(`${apiUrl}/cart/additem`, payloadData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            toast.success('Product ditambahkan di keranjang', {
              position: toast.POSITION.TOP_CENTER
            })
            if (!productIds.includes(productIdNumber)) {
              dispatch(increment(productIdNumber))
            }
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
    dispatch(fetchProducts())
    isProductActive ? setIsDisabled(false) : setIsDisabled(true)
  }, [dispatch])

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
