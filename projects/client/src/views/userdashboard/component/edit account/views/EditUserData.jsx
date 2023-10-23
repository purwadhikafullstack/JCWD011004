import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Styles.css'
// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
function EditUserData({ handleShowEdit, userData }) {
  const [isDisabled, setIsDisabled] = useState(false)
  const editInformation = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address'),
      phoneNumber: Yup.string()
        .matches(/^0?\d{8,11}$/, 'Phone number must be between 9 and 12 digits')
        .matches(/^\d+$/, 'Phone number should only contain digits')
    }),

    onSubmit: (values) => {
      const payload = {}
      setIsDisabled(true)
      for (const key in values) {
        if (values[key]) {
          payload[key] = values[key]
        }
      }
      const token = localStorage.getItem('token')
      axios
        .post(`${apiUrl}/update/user`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          setIsDisabled(false)
          toast.success('Check email untuk verifikasi perubahan', {
            position: toast.POSITION.TOP_CENTER
          })
        })
        .catch((error) => {
          toast.error(error?.response?.data, {
            position: toast.POSITION.TOP_CENTER
          })
          setIsDisabled(false)
        })
    }
  })
  return (
    <form onSubmit={editInformation.handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="flex">First Name</label>
          <input
            name="firstName"
            placeholder={userData?.firstName}
            className="h-8 focus:outline-none focus:border-blue-500 border-2"
            onChange={editInformation.handleChange}
            value={editInformation.values.firstName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex">Last Name</label>
          <input
            name="lastName"
            placeholder={userData?.lastName}
            className="h-8 focus:outline-none focus:border-blue-500 border-2"
            onChange={editInformation.handleChange}
            value={editInformation.values.lastName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex gap-3">
            Email{' '}
            {editInformation.errors.email ? (
              <div className="bg-blue-700 flex-grow text-white">
                {editInformation.errors.email}
              </div>
            ) : null}
          </label>
          <input
            name="email"
            placeholder={userData?.email}
            className="h-8 focus:outline-none focus:border-blue-500 border-2"
            onChange={editInformation.handleChange}
            value={editInformation.values.email}
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label className="flex gap-3">
            Phone
            {editInformation.errors.phoneNumber ? (
              <div className="bg-blue-700 flex-grow text-white">
                {editInformation.errors.phoneNumber}
              </div>
            ) : null}
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder={userData?.phoneNumber}
            className="h-8 focus:outline-none focus:border-blue-500 border-2 number-input"
            onChange={editInformation.handleChange}
            value={editInformation.values.phoneNumber}
          />

          <div className="flex justify-end gap-10 mt-5">
            <button onClick={handleShowEdit} className="btn-text">
              Cancel
            </button>
            <button
              type="submit"
              className={
                isDisabled
                  ? 'btn bg-blue-400'
                  : 'btn bg-blue-700 hover:bg-blue-400 active:bg-blue-700'
              }
              disabled={isDisabled}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  )
}

export default EditUserData
