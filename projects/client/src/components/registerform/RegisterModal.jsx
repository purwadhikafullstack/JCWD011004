import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
    // Add other fields and validation rules as needed
  })

  const formik = useFormik({
    initialValues: {
      email: ''
      // Initialize other form fields here
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/register',
          values
        )
        if (response.status === 200) {
          // Handle success
          console.log('register done')
        }
      } catch (error) {
        // Handle API errors (e.g., display an error message)
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
            <label
              htmlFor="email"
              className="flex block text-gray-600 font-medium"
            >
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
              type="submit"
              className="px-4 py-2 bg-orange-300 text-white rounded-full hover:bg-orange-400 focus:outline-none"
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
    </div>
  )
}

export default RegisterModal
