import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
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

function ConfirmationForm() {
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

  useEffect(() => {}, [])

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
        {({ errors, touched }) => {
          return (
            <Form className="max-w-md mx-auto">
              <table className="w-full">
                <tbody>
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
                      <label
                        htmlFor="username"
                        className="block font-medium text-gray-700"
                      >
                        Username
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="WarehouseName"
                        className="block font-medium text-gray-700"
                      >
                        Warehouse Name
                      </label>
                    </td>
                    <td className="p-4">
                      <label
                        htmlFor="WarehouseName"
                        className="block font-medium text-gray-700"
                      >
                        Name Gudang
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="payment"
                        className="block font-medium text-gray-700"
                      >
                        Payment Method
                      </label>
                    </td>
                    <td className="p-4">
                      <label
                        htmlFor="firstName"
                        className="block font-medium text-gray-700"
                      >
                        BCA
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="payment"
                        className="block font-medium text-gray-700"
                      >
                        Shipping Address
                      </label>
                    </td>
                    <td className="p-4">
                      <label
                        htmlFor="payment"
                        className="block font-medium text-gray-700"
                      >
                        Shipping Address
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="payment"
                        className="block font-medium text-gray-700"
                      >
                        Payment Status
                      </label>
                    </td>
                    <td className="p-4">
                      <label
                        htmlFor="payment"
                        className="block font-medium text-gray-700"
                      >
                        Payment Status
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="warehouse"
                        className="block font-medium text-gray-700"
                      >
                        Rp 7.700.00
                      </label>
                    </td>
                    <td className="p-4">
                      <button>confirm payment</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          )
        }}
      </Formik>
      <ToastContainer />
    </>
  )
}

export default ConfirmationForm
