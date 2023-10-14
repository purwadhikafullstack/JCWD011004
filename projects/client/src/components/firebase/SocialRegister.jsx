import React, { useState } from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FcGoogle } from 'react-icons/fc'

// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
function SocialRegister() {
  const [isDisabled, setIsDisabled] = useState(false)
  const handleRegister = async () => {
    try {
      setIsDisabled(true)
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const response = await axios.post(`${apiUrl}/auth/register-social`, {
        idToken: result._tokenResponse.idToken
      })
      // Simpan token ke localStorage
      setIsDisabled(false)
      localStorage.setItem('token', response.data.token)
      toast.success('Registrasi berhasil', {
        position: toast.POSITION.TOP_CENTER
      })
      window.location.reload()
    } catch (error) {
      // Terjadi error saat registrasi
      setIsDisabled(false)
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <button
      disabled={isDisabled}
      onClick={handleRegister}
      className={
        isDisabled
          ? 'flex justify-center text-base mt-5  bg-gray-200 active:bg-white rounded-full cursor-not-allowed'
          : 'flex justify-center text-base mt-5 cursor-pointer bg-gray-200 active:bg-white rounded-full'
      }
    >
      <p>Register with&nbsp;</p>
      <FcGoogle className="self-center" />
      <ToastContainer />
    </button>
  )
}

export default SocialRegister
