import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dropdown from '../dropdown/dropdownCategory'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCategoryIdx,
  triggerWarehouseProduct
} from '../../services/reducer/productReducer'

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_BASE_URL
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  price: Yup.string()
    .required('Required Number')
    .matches(/^[0-9]+$/, 'Price must be a valid number'),
  weight: Yup.string().required('Required'),
  description: Yup.string().required('Required')
})

function CreateProductForm({ onClose }) {
  const categoryIdx = useSelector((state) => state.dataProduct.categoryIdx)
  const isWarehouseProduct = useSelector(
    (state) => state.dataProduct.isWarehouseProduct
  )
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    try {
      if (categoryIdx === 0) {
        values.categoryId = 99
      } else {
        values.categoryId = categoryIdx
      }
      const res = await axios.post(`${apiUrl}/product/new`, values)

      if (res.status === 200) {
        const toastId = toast.success('Product created successfully!', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
          onClose(true)
        }, 2000)
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(triggerWarehouseProduct(!isWarehouseProduct))
  }

  const formikProps = {
    initialValues: {
      name: '',
      price: '',
      weight: '',
      description: '',
      categoryId: 0
    },
    validationSchema,
    onSubmit: handleSubmit
  }

  useEffect(() => {
    dispatch(getCategoryIdx(0))
  }, [])

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
                        htmlFor="name"
                        className="block font-medium text-gray-700"
                      >
                        Product Name
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="Product Name"
                        type="text"
                        name="name"
                        className="form-input rounded-md shadow-sm p-1 block w-full"
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="price"
                        className="block font-medium text-gray-700"
                      >
                        Price
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="Price"
                        type="text"
                        name="price"
                        className="form-input rounded-md shadow-sm p-1 block w-full"
                      />
                      {errors.price && touched.price && (
                        <div className="text-red-500">{errors.price}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="weight"
                        className="block font-medium text-gray-700"
                      >
                        Weight
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        placeholder="Weight"
                        type="text"
                        name="weight"
                        className="form-input rounded-md shadow-sm p-1 block w-full"
                      />
                      {errors.weight && touched.weight && (
                        <div className="text-red-500">{errors.weight}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="description"
                        className="block font-medium text-gray-700"
                      >
                        Description
                      </label>
                    </td>
                    <td className="p-4">
                      <Field
                        as="textarea"
                        placeholder="Description"
                        name="description"
                        className="form-input rounded-md shadow-sm p-1 block w-full h-40"
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-500">{errors.description}</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="category"
                        className="block font-medium text-gray-700"
                      >
                        Category
                      </label>
                    </td>
                    <td className="p-4">
                      <Dropdown admin={true} />
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

export default CreateProductForm
