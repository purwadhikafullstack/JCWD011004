import React from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FcGoogle } from 'react-icons/fc'

function SocialRegister() {
  const handleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const response = await axios.post(
        `http://localhost:8000/api/auth/register-social`,
        {
          idToken: result._tokenResponse.idToken
        }
      )
      // Simpan token ke localStorage
      localStorage.setItem('token', response.data.token)
      toast.success('Registrasi berhasil', {
        position: toast.POSITION.TOP_CENTER
      })
      window.location.reload()
    } catch (error) {
      // Terjadi error saat registrasi
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <div
      onClick={handleRegister}
      className="flex justify-center text-base mt-5 cursor-pointer"
    >
      <p>Register with&nbsp;</p>
      <FcGoogle className="self-center" />
      <ToastContainer />
    </div>
  )
}

export default SocialRegister
