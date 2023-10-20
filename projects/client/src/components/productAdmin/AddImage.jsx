import React, { useRef, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { triggerWarehouseProduct } from '../../services/reducer/productReducer'
import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
const AddImage = ({ productId }) => {
  const [photoPreview, setPhotoPreview] = useState(null)
  const isWarehouseProduct = useSelector(
    (state) => state.dataProduct.isWarehouseProduct
  )
  const dispatch = useDispatch()

  const photoRef = useRef()

  const onSelectPhoto = () => {
    const file = photoRef.current.files[0]
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const validSize = 1000000 // 1MB in bytes

    if (file && validTypes.includes(file.type) && file.size <= validSize) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      if (file && !validTypes.includes(file.type)) {
        toast.error(
          'Invalid file type. Please select a jpg, png, or gif image.',
          {
            position: toast.POSITION.BOTTOM_CENTER
          }
        )
      } else if (file && file.size > validSize) {
        toast.error('File size exceeds the limit of 1MB.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    }
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('myImage', photoRef.current.files[0])

    try {
      const response = await axios.post(
        `${apiUrl}/product/upload-product/${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if (response?.status === 200) {
        photoRef.current.value = null
        setPhotoPreview(null)
        toast.success('Add image product succeed', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        dispatch(triggerWarehouseProduct(!isWarehouseProduct))
      } else {
        toast.error('Add image product failed', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    } catch (error) {
      toast.error('Add image product failed', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  }

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={photoRef}
        onChange={onSelectPhoto}
      />
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-center"
        htmlFor="photo"
      >
        <span className="text-red-600"> </span>
      </label>
      <div className="text-center">
        <div
          className="mt-2"
          style={{ display: photoPreview ? 'none' : 'block' }}
        >
          <img
            onClick={() => photoRef.current.click()}
            src={'https://img.icons8.com/%20file'}
            className="w-40 h-40 py m-auto rounded-lg shadow cursor-pointer hover:opacity-80 transition duration-300"
          />
        </div>
        <div
          className="mt-2"
          style={{ display: photoPreview ? 'block' : 'none' }}
        >
          <span
            className="block w-40 h-40 rounded-full m-auto shadow"
            style={{
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundImage: `url(${photoPreview})`
            }}
          ></span>
        </div>
        -
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
          onClick={uploadImage}
        >
          Add Image
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddImage
