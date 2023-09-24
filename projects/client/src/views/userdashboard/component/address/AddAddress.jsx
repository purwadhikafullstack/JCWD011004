import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { openAddAddress } from '../../../../services/reducer/addressReducer'
import { useDispatch } from 'react-redux'
import DropdownProvince from './DropdownProvince'
import DropdownCityRegency from './DropdownCityRegency'

const phoneRegExp = /^(\+62|62|0)8[1-9][0-9]/

export const AddAddress = () => {
  const dispatch = useDispatch()

  const handleCancel = () => {
    dispatch(openAddAddress(false))
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Username must have at least 3 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Invalid phone number format')
      .min(10, 'Phone number must have at least 10 characters')
      .max(13, 'Phone number not more than 13 characters'),
    address: Yup.string()
      .required('Subdistrict is required')
      .min(3, 'Subdistrict must have at least 3 characters'),
    subdistrict: Yup.string()
      .required('Subdistrict is required')
      .min(3, 'Subdistrict must have at least 3 characters'),
    postalcode: Yup.string()
      .required('Postal Code is required')
      .min(5, 'Postal Code must have at least 5 characters')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      subdistrict: '',
      postalcode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values)
      } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  })

  return (
    <div className="bg-white p-4 rounded-lg w-full text-sm">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-start"
      >
        <div className="mb-2">
          <div className="flex items-center w-full">
            <label htmlFor="name" className="mr-2 text-black-600 w-20">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="px-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <div className="flex items-center w-full">
            <label htmlFor="phone" className="mr-2 text-black-600 w-20">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              className="px-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <div className="flex items-center">
            <label htmlFor="address" className="mr-2 text-black-600 w-20">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className="px-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500">{formik.errors.address}</div>
          ) : null}
        </div>
        <div className="mb-2 flex items-center z-10">
          <label htmlFor="province" className="mr-2 text-black-600 w-20">
            Province
          </label>
          <DropdownProvince />
        </div>
        <div className="mb-2 flex items-center">
          <label htmlFor="cityregency" className="mr-2 text-black-600 w-20">
            City/Regency
          </label>
          <DropdownCityRegency />
        </div>
        <div className="mb-2">
          <div className="flex items-center">
            <label htmlFor="subdistrict" className="mr-2 text-black-600 w-20">
              Subdistrict
            </label>
            <input
              type="text"
              id="subdistrict"
              name="subdistrict"
              placeholder="Subdistrict"
              className="px-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
              value={formik.values.subdistrict}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.subdistrict && formik.errors.subdistrict ? (
            <div className="text-red-500">{formik.errors.subdistrict}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <div className="flex items-center">
            <label htmlFor="postalcode" className="mr-2 text-black-600 w-20">
              Postal Code
            </label>
            <input
              type="text"
              id="postalcode"
              name="postalcode"
              placeholder="Postal Code"
              className="px-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
              value={formik.values.postalcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.postalcode && formik.errors.postalcode ? (
            <div className="text-red-500">{formik.errors.postalcode}</div>
          ) : null}
        </div>
        <div className="flex justify-center space-x-4 w-full">
          <button
            onClick={handleCancel}
            className="w-24 py-2 bg-gray-300 text-white rounded-full hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-24 py-2 bg-blue-300 text-white rounded-full hover:bg-blue-400 focus:outline-none"
          >
            Add
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
