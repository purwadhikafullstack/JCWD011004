import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginModal = ({ isOpen, onClose, onOpenRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          email: email,
          password: password
        }
      )

      if (response.status === 200) {
        console.log('Login Berhasil')
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
        // Login gagal
        console.log('Login Gagal')
        toast.error('Login Gagal', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    } catch (error) {
      // Terjadi kesalahan dalam melakukan permintaan ke API
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
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium flex"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 font-medium flex"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
            Didn't have an account?{' '}
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
