import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  const [isDisabled, setIsDisabled] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsDisabled(true)
        const response = await axios.post(
          'http://localhost:8000/api/auth/register',
          values
        )
        if (response.status === 200) {
          toast.success('Register Berhasil', {
            position: toast.POSITION.TOP_CENTER
          })
          setIsDisabled(false)
          setTimeout(() => {
            onClose()
          }, 2000)
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
        setIsDisabled(false)
      }
    }
  })

  RegisterModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpenLogin: PropTypes.func.isRequired
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
        <h2 className="text-2xl text-gray-600 font-semibold mb-4 jus">
          Register
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="flex text-gray-600 font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* Add other form fields here */}
          <div className="flex justify-center">
            <button
              disabled={isDisabled}
              type="submit"
              className={
                isDisabled
                  ? 'bg-orange-200 text-white rounded-full py-2 px-10'
                  : 'bg-orange-300 text-white rounded-full py-2 px-10 active:bg-orange-300 hover:bg-orange-400 focus:outline-none'
              }
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-400">
            Already have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={onOpenLogin}
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default RegisterModal
