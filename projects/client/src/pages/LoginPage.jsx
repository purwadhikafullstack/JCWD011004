import React, { useState } from 'react'
import LoginModal from '../components/loginModal/loginModal'
import RegisterModal from '../components/registerform/RegisterModal'
import ResetPasswordModal from '../components/resetPasswordModal/ResetPasswordModal'

import UserDashboard from '../views/userdashboard/UserDashboard'
const LoginPage = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true)
    setRegisterModalOpen(false)
  }

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false)
  }

  const handleopenRegisterModal = () => {
    setLoginModalOpen(false)
    setRegisterModalOpen(true)
  }

  const handlecloseRegisterModal = () => {
    setRegisterModalOpen(false)
  }

  const handleOpenResetModalOpen = () => {
    setResetPasswordModalOpen(true)
    setRegisterModalOpen(false)
    setRegisterModalOpen(false)
  }

  const handleCloseResetModalOpen = () => {
    setResetPasswordModalOpen(false)
  }

  return (
    <div>
      <h1>Contoh Aplikasi React</h1>
      <button
        className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 focus:outline-none"
        onClick={handleOpenLoginModal}
      >
        Buka Modal Login
      </button>
      <button
        className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 focus:outline-none"
        onClick={handleOpenResetModalOpen}
      >
        Buka modal reset password
      </button>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onOpenRegister={handleopenRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handlecloseRegisterModal}
        onOpenLogin={handleOpenLoginModal}
      />
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={handleCloseResetModalOpen}
      />
      <UserDashboard />
    </div>
  )
}

export default LoginPage
