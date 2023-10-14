import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/\d/, 'Password must have at least one number')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      'Password must have at least one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})

function RequestResetPass() {
  const { token } = useParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const nav = useNavigate()
  const handleSubmit = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/auth/reset-password`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      if (response.status === 200) {
        toast.success('Reset Password Berhasil Silahkan login', {
          position: toast.POSITION.TOP_CENTER
        })
        nav('/')
      }
    } catch (error) {
      console.error(error)
      toast.error('terjadi kesalahan', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">
          Reset Password
        </h2>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="flex mb-1" htmlFor="password">
                  Password
                </label>
                <div className="flex gap-1">
                  <Field
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🔓' : '🔒'}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" />
              </div>
              <div className="mb-4">
                <label className="flex mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="flex gap-1">
                  <Field
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🔓' : '🔒'}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                >
                  Reset Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  )
}

export default RequestResetPass
