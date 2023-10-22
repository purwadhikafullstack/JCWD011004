import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
const AvatarUpload = () => {
  const [photoPreview, setPhotoPreview] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)

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
      setIsDisabled(false)
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

  const fetchImage = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${apiUrl}/update/avatars`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAvatar(response.data)
    } catch (error) {
      setAvatar(null)
    }
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('myImage', photoRef.current.files[0])

    try {
      const response = await axios.patch(`${apiUrl}/update/avatars`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response?.status === 200) {
        fetchImage()
        setIsDisabled(true)
        toast.success('Avatar berhasil diubah', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        window.location.reload()
      } else {
        setIsDisabled(true)
        toast.error('Terjadi Kesalahan', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    } catch (error) {
      toast.error('Terjadi Kesalahan', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  }

  useEffect(() => {
    fetchImage()
  }, [])

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
            src={
              avatar
                ? avatar?.avatar
                : 'https://img.icons8.com/pastel-glyph/512/person-male--v3.png'
            }
            className="w-36 h-36 py m-auto rounded-full shadow cursor-pointer hover:opacity-80 transition duration-300"
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
          disabled={isDisabled}
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
          onClick={uploadImage}
        >
          Changes Photo
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AvatarUpload
