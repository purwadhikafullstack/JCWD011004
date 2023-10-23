import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FcGoogle } from 'react-icons/fc'
// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
function UpdateButton() {
  const [currentEmail, SetCurrentEmail] = useState('')
  const updateUser = async (idToken, email) => {
    try {
      const response = await axios.patch(`${apiUrl}/update/user-google-auth`, {
        idToken,
        email
      })
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
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${apiUrl}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      SetCurrentEmail(response?.data?.userInfo?.email)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()
      const email = result.user.email

      if (email !== currentEmail) {
        toast.error('Email harus sama', {
          position: toast.POSITION.TOP_CENTER
        })
        return
      }
      updateUser(idToken, email)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
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
