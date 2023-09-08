import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginModal = ({ isOpen, onClose, onOpenRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error('Email dan password harus diisi', {
          position: toast.POSITION.TOP_CENTER
        })
        return
      }

      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: email,
        password: password
      })

      if (response.status === 200) {
        toast.success('Login Berhasil', {
          position: toast.POSITION.TOP_CENTER
        })
        const userRole = response.data.role
        if (userRole === 1) {
          setTimeout(() => {
            window.location.href = '/admin'
          }, 1000)
        } else {
          setTimeout(() => {
            window.location.href = '/user'
          }, 1000)
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
    onOpenRegister: PropTypes.func.isRequired
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
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
          <span>Forgot Password?</span>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white rounded-full py-2 px-10 hover:bg-blue-600 focus:outline-none"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center text-sm">
          <p className="text-black-500">
            Dont have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={onOpenRegister}
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginModal
