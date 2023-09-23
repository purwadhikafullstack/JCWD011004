import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { isLogin } from '../../services/reducer/productReducer'
import SocialLogin from '../firebase/SocialLogin'

const LoginModal = ({ isOpen, onClose, onOpenRegister, onOpenResetPass }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error('Email dan password harus di isi', {
          position: toast.POSITION.TOP_CENTER
        })
        return
      }

      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: email,
        password: password
      })

      if (response.status === 200) {
        const userRole = response.data.role
        if (userRole === 3) {
          toast.success('Login Berhasil', {
            position: toast.POSITION.TOP_CENTER
          })
          localStorage.setItem('token', response.data.token)
          setTimeout(() => {
            onClose()
            dispatch(isLogin(response.data.token))
          }, 2000)
        } else {
          toast.error('Wrong User', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      } else {
        toast.error('Login Gagal', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      toast.error('Terjadi kesalahan', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpenRegister: PropTypes.func.isRequired,
    onOpenResetPass: PropTypes.func.isRequired
  }

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? 'block' : 'hidden'
      } bg-black bg-opacity-50 flex items-center justify-center z-50`}
    >
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-80 flex flex-col items-center">
        <button
          className="absolute top-0 right-0 m-3 text-black-500 hover:text-black-500 focus:outline-none"
          onClick={onClose}
        >
          <span className="text-2xl font-bold cursor-pointer">×</span>
        </button>
        <h2 className="text-2xl text-gray-600 font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-600 font-medium flex">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="text-gray-600 font-medium flex">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full p-2  border rounded border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute top-2 right-2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="absolute top-2 right-2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="mb-3 mt-[-0.25rem] flex justify-end text-blue-700 text-sm cursor-pointer hover:underline">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={onOpenResetPass}
          >
            Forgot Password?
          </span>
        </div>
        <div className="flex justify-center">
          <button
            className="px-7 py-2 bg-orange-300 text-white rounded-full hover:bg-orange-400 focus:outline-none"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center text-sm flex flex-col">
          <p className="text-gray-400">
            Dont have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={onOpenRegister}
            >
              Register
            </span>
          </p>
          <SocialLogin />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginModal
