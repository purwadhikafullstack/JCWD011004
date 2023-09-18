import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const phoneRegExp = /^(\+62|62|0)8[1-9][0-9]/

const RegisterModal = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPassVisible, setConfirmPassVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPassVisibility = () => {
    setConfirmPassVisible(!confirmPassVisible)
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must have at least 3 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Invalid phone number format')
      .min(10, 'Phone number must have at least 10 characters')
      .max(13, 'Phone number not more than 13 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must have at least 6 characters')
      .matches(/[0-9]/, 'Password must have min 1 number')
      .matches(/[A-Z]/, 'Password must have min 1 capital character')
      .matches(/[!@#$%^&*)(+=.,_-]/, 'Password must have min 1 symbol'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Confirm Password is not match')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/register',
          values
        )
        if (response.status === 200) {
          toast.success('Register Berhasil', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  })

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
    >
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-80 flex flex-col items-center">
        <h2 className="text-2xl text-gray-600 font-semibold mb-4">
          Verify Your Account
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="flex text-gray-600 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="flex text-gray-600 font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="flex text-gray-600 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500 "
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="flex text-gray-600 font-medium"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPassVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer"
                onClick={toggleConfirmPassVisibility}
              >
                {confirmPassVisible ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-7 py-2 bg-orange-300 text-white rounded-full hover:bg-orange-400 focus:outline-none"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default RegisterModal
