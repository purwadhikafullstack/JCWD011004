import React from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FcGoogle } from 'react-icons/fc'

function UpdateButton() {
  const updateUser = async (idToken, email) => {
    try {
      const response = await axios.patch(
        'http://localhost:8000/api/update/user-google-auth',
        {
          idToken,
          email
        }
      )
      if (response.status === 200) {
        toast.success('Sync Google Auth berhasil', {
          position: toast.POSITION.TOP_CENTER
        })
        window.location.reload()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()
      const email = result.user.email
      updateUser(idToken, email)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      onClick={handleSignIn}
      className="flex bg-white hover:bg-slate-200 active:bg-white rounded-xl justify-center text-base cursor-pointer"
    >
      <p>Sync With</p>
      <FcGoogle className="self-center" />
      <ToastContainer />
    </div>
  )
}

export default UpdateButton
