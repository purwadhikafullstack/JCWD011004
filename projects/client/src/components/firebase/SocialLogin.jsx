import React from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FcGoogle } from 'react-icons/fc'

function SocialLogin() {
  //   const apiUrl = process.env.REACT_APP_API_BASE_URL
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const response = await axios.post(
        `http://localhost:8000/api/auth/login-social`,
        {
          idToken: result._tokenResponse.idToken
        }
      )
      // Simpan token ke localStorage
      localStorage.setItem('token', response.data.token)
      toast.success('Login berhasil', { position: toast.POSITION.TOP_CENTER })
      window.location.reload()
    } catch (error) {
      // Terjadi error saat login
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <div
      onClick={handleLogin}
      className="flex justify-center text-base mt-5 cursor-pointer"
    >
      <p>Login with&nbsp;</p>
      <FcGoogle className="self-center" />
      <ToastContainer />
    </div>
  )
}

export default SocialLogin
