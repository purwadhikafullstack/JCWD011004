import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { triggerWarehouseProduct } from '../../services/reducer/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import AddImage from './AddImage'
import jwtdecode from 'jwt-decode'

const user = () => {
  const token = localStorage.getItem('token')
  if (token) return jwtdecode(token)
}

function ProductImage({ dataProduct }) {
  const dataAllProduct = useSelector((state) => state.dataProduct.allProducts)
  const [dataSelectedProduct, setDataSelectedProduct] = useState(dataProduct)

  const matchingProduct = dataAllProduct.products.find(
    (product) => product.id === dataProduct.id
  )

  const dispatch = useDispatch()
  const isWarehouseProduct = useSelector(
    (state) => state.dataProduct.isWarehouseProduct
  )
  //eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handleDeleteImage = async (productId) => {
    try {
      const res = await axios.delete(`${apiUrl}/product/${productId}`)
      if (res?.status === 200) {
        const toastId = toast.success(`Warehouse product deleted`, {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setTimeout(() => {
          toast.dismiss(toastId)
        }, 2000)
      }
    } catch (error) {
      const toastId = toast.error(`Failed to delete`, {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
    dispatch(triggerWarehouseProduct(!isWarehouseProduct))
  }

  useEffect(() => {
    setDataSelectedProduct(matchingProduct)
  }, [dataAllProduct])

  return (
    <>
      <table className="w-80">
        <tbody>
          {dataSelectedProduct.Product_Images.map((data, index) => (
            <tr key={index}>
              <td className="flex items-center justify-between px-4 py-1 border-2 border-white m-1">
                <img
                  src={
                    data
                      ? data.image
                      : 'https://img.icons8.com/?size=24&id=ISa1R6iLRzOK&format=png'
                  }
                  className="w-auto h-20 rounded-md shadow cursor-pointer hover:opacity-80 transition duration-300"
                />
                {user().role === 1 ? (
                  <button
                    onClick={() => handleDeleteImage(data.id)}
                    key={index}
                    className={`btn h-9 w-16 active:bg-gray-700 hover:bg-gray-400 bg-gray-700`}
                  >
                    Delete
                  </button>
                ) : (
                  ''
                )}
              </td>
            </tr>
          ))}
          {user().role === 1 ? <AddImage productId={dataProduct.id} /> : ''}
        </tbody>
      </table>
      <ToastContainer />
    </>
  )
}

export default ProductImage
