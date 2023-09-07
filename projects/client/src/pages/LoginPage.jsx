import React, { useState } from 'react'
import LoginModal from '../components/loginModal/loginModal'
import RegisterModal from '../components/registerform/RegisterModal'
const LoginPage = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)

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

  return (
    <div>
      <h1>Contoh Aplikasi React</h1>
      <button
        className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 focus:outline-none"
        onClick={handleOpenLoginModal}
      >
        Buka Modal Login
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
    </div>
  )
}

export default LoginPage
