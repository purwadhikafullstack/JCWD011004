import React, { useState } from 'react'
import LoginModal from '../loginModal/loginModal'
import RegisterModal from '../registerform/RegisterModal'
import ResetPasswordModal from '../resetPasswordModal/ResetPasswordModal'
const ButtonLoginRegister = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true)
    setRegisterModalOpen(false)
    setResetPasswordModalOpen(false)
  }

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false)
  }

  const handleopenRegisterModal = () => {
    setLoginModalOpen(false)
    setRegisterModalOpen(true)
    setResetPasswordModalOpen(false)
  }

  const handlecloseRegisterModal = () => {
    setRegisterModalOpen(false)
  }

  const handleOpenResetModalOpen = () => {
    setLoginModalOpen(false)
    setRegisterModalOpen(false)
    setResetPasswordModalOpen(true)
  }

  const handleCloseResetModalOpen = () => {
    setResetPasswordModalOpen(false)
  }

  return (
    <div className="flex items-center">
      <button
        className="bg-transparent text-white hover:bg-orange-300 hover:text-white rounded-full py-1 px-2 focus:outline-none"
        onClick={handleOpenLoginModal}
      >
        Login
      </button>
      <p>/</p>
      <button
        className="bg-transparent text-white hover:bg-orange-300 hover:text-white rounded-full py-1 px-2 focus:outline-none"
        onClick={handleopenRegisterModal}
      >
        Register
      </button>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onOpenRegister={handleopenRegisterModal}
        onOpenResetPass={handleOpenResetModalOpen}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handlecloseRegisterModal}
        onOpenLogin={handleOpenLoginModal}
      />
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={handleCloseResetModalOpen}
        onOpenLogin={handleOpenLoginModal}
      />
    </div>
  )
}

export default ButtonLoginRegister
