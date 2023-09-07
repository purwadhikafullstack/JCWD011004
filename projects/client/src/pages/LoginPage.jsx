import React, { useState } from 'react';
import LoginModal from '../components/loginModal/loginModal'


const LoginPage = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div>
      <h1>Contoh Aplikasi React</h1>
      <button
        className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 focus:outline-none"
        onClick={handleOpenLoginModal}
      >
        Buka Modal Login
      </button>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
};

export default LoginPage;