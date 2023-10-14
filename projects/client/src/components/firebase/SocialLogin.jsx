import React, { useState } from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FcGoogle } from 'react-icons/fc'

function SocialLogin() {
  // eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const [isDisabled, setIsDisabled] = useState(false)
  const handleLogin = async () => {
    try {
      setIsDisabled(true)
      const result = await signInWithPopup(auth, provider)

      const response = await axios.post(`${apiUrl}/auth/login-social`, {
        idToken: result._tokenResponse.idToken
      })

      localStorage.setItem('token', response.data.token)
      toast.success('Login berhasil', { position: toast.POSITION.TOP_CENTER })
      setIsDisabled(false)
      window.location.reload()
    } catch (error) {
      setIsDisabled(false)
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <button
      disabled={isDisabled}
      onClick={handleLogin}
      className={
        isDisabled
          ? 'flex justify-center text-base mt-5  bg-gray-200 active:bg-white rounded-full cursor-not-allowed'
          : 'flex justify-center text-base mt-5 cursor-pointer bg-gray-200 active:bg-white rounded-full'
      }
    >
      <p>Login with&nbsp;</p>
      <FcGoogle className="self-center" />
      <ToastContainer />
    </button>
  )
}

export default SocialLogin
