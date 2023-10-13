import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const token = localStorage.getItem('token')
// eslint-disable-next-line no-undef
const apiurl = process.env.REACT_APP_API_BASE_URL
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .required('Required')
    .min(9, 'Phone number must be at least 9 digits long')
    .test('is-number', 'Invalid phone number', (value) => {
      if (!value) {
        return false
      }

      const regex = /^[0-9]*$/
      return regex.test(value)
    }),
  warehouseId: Yup.string().required('Required')
})

function CreateAdminForm() {
  const [warehouses, setWarehouses] = useState([])

  const getWarehouses = async () => {
    try {
      const res = await axios.get(`${apiurl}/admin/warehouses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setWarehouses(res?.data?.data?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${apiurl}/admin/create-warehouse-admin`,
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(res)
      toast.success('Admin created successfully!', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } catch (error) {
      console.log(error, 'ni errror')
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    getWarehouses()
  }, [])

  const formikProps = {
    initialValues: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      warehouseId: 0
    },
    validationSchema,
    onSubmit: handleSubmit
  }

  return (
    <>
      <Formik {...formikProps}>
        {({ errors, touched, isSubmitting }) => {
          return (
            <Form className="max-w-md mx-auto">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="email"
                        className="block font-medium text-gray-700"
                      >
                        Email
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="Email"
                        type="email"
                        name="email"
                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500">{errors.email}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="username"
                        className="block font-medium text-gray-700"
                      >
                        Username
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="Username"
                        type="text"
                        name="username"
                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                      />
                      {errors.username && touched.username && (
                        <div className="text-red-500">{errors.username}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="firstName"
                        className="block font-medium text-gray-700"
                      >
                        First Name
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="text-red-500">{errors.firstName}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="lastName"
                        className="block font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="text-red-500">{errors.lastName}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="phoneNumber"
                        className="block font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="Phone Number"
                        type="tel"
                        name="phoneNumber"
                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault()
                          }
                        }}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <div className="text-red-500">{errors.phoneNumber}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="warehouse"
                        className="block font-medium text-gray-700"
                      >
                        Warehouse
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        as="select"
                        name="warehouseId"
                        className="form-select rounded-md shadow-sm mt-1 block w-full"
                      >
                        <option value="">Select Warehouse</option>
                        {warehouses?.map((e, i) => (
                          <option key={i} value={e?.id}>
                            {e?.name}
                          </option>
                        ))}
                      </Field>
                      {errors.warehouseId && touched.warehouseId && (
                        <div className="text-red-500">{errors.warehouseId}</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-4"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )
        }}
      </Formik>
      <ToastContainer />
    </>
  )
}

export default CreateAdminForm
