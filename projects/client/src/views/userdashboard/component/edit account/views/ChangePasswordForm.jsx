import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './Styles.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .required('Password is required')
    .min(6, 'must be at least 6 characters')
    .matches(/\d/, 'must have at least one number')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      'must have at least one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required')
})

function ChangePasswordForm({ handleShowEditPassword }) {
  const [isSubmitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formik = {
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      setSubmitting(true)
      try {
        const token = localStorage.getItem('token')
        const response = await axios.post(
          `${apiUrl}/update/user/password`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        toast.success(response.data, {
          position: toast.POSITION.TOP_CENTER
        })
      } catch (error) {
        toast.error('Terjadi Kesalahan', {
          position: toast.POSITION.TOP_CENTER
        })
      }
      setSubmitting(false)
    }
  }

  return (
    <Formik {...formik}>
      {() => (
        <Form className="flex flex-col gap-2 mb-5 text-sm">
          <label className="flex gap-5">
            Old Password{' '}
            <ErrorMessage
              className="bg-blue-700 flex-grow  text-white"
              name="oldPassword"
              component="div"
            />
          </label>
          <div className="flex justify-between">
            <Field
              placeholder="Old Password"
              className="h-8 focus:outline-none focus:border-blue-500 border-2 flex-grow"
              type={showPassword ? 'text' : 'password'}
              name="oldPassword"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <>
                  <FaEyeSlash />
                </>
              ) : (
                <>
                  <FaEye />
                </>
              )}
            </button>
          </div>
          <label className="flex gap-2">
            New Password{' '}
            <ErrorMessage
              className="bg-blue-700 flex-grow text-white"
              name="newPassword"
              component="div"
            />
          </label>
          <div className="flex justify-between">
            <Field
              placeholder="New Password"
              className="h-8 focus:outline-none focus:border-blue-500 border-2 flex-grow"
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <>
                  <FaEyeSlash />
                </>
              ) : (
                <>
                  <FaEye />
                </>
              )}
            </button>
          </div>

          <label className="flex gap-2">
            Repeat New Password
            <ErrorMessage
              className="bg-blue-700 flex-grow text-white"
              name="confirmPassword"
              component="div"
            />
          </label>
          <div className="flex justify-between">
            <Field
              placeholder="Old Password"
              className="h-8 focus:outline-none focus:border-blue-500 border-2 flex-grow"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <>
                  <FaEyeSlash />
                </>
              ) : (
                <>
                  <FaEye />
                </>
              )}
            </button>
          </div>

          <div className="flex justify-end gap-10 mt-4">
            <button
              onClick={handleShowEditPassword}
              className="btn-text"
              type="button"
            >
              Cancel
            </button>
            <button
              className={
                isSubmitting
                  ? 'btn bg-blue-400'
                  : 'btn bg-blue-700 hover:bg-blue-400 active:bg-blue-700'
              }
              type="submit"
              disabled={isSubmitting}
            >
              Change Password
            </button>
          </div>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  )
}

export default ChangePasswordForm
