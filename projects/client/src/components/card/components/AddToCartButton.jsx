import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginModal from '../../loginModal/loginModal'

function AddToCartButton() {
  const [openLoginModal, setLoginModalOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleLoginModal = () => {
    setLoginModalOpen(!openLoginModal)
  }
  const handleAddToCart = () => {
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
      : toast.success('Product ditambahkan di keranjang', {
          position: toast.POSITION.TOP_CENTER
        })
    setIsDisabled(false)
  }

  return (
    <>
      <button
        disabled={isDisabled}
        className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <LoginModal isOpen={openLoginModal} onClose={handleLoginModal} />
      <ToastContainer />
    </>
  )
}

export default AddToCartButton
