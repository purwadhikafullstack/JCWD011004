import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function UploadButton({ transactionId, userId, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first.')
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('receipt', selectedFile)

      const response = await axios.post(
        `http://localhost:8000/api/payment/proof/${transactionId}?userId=${userId}`,
        formData
      )
      console.log('API Response:', response.data)
      toast.success('Image uploaded successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Panggil onCancel jika tombol Cancel diklik
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div>
      <input
        type="file"
        id="file-input"
        name="ImageStyle"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
        disabled={isLoading}
      />
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => document.getElementById('file-input').click()}
          className={`flex items-center justify-center px-2 py-1 rounded bg-neutral-500 text-white hover:bg-neutral-800 focus:outline-none focus:ring focus:ring-blue-300`}
          style={{ width: '170px', cursor: 'pointer' }}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
        <button
          onClick={handleUpload}
          className={`flex items-center justify-center px-2 py-1 rounded bg-orange-400 text-white hover:bg-orange-600 focus:outline-none focus:ring focus:ring-green-300`}
          style={{ width: '170px' }}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Post'}
        </button>
        <button
          onClick={handleCancel}
          className={`flex items-center justify-center px-2 py-1 rounded bg-red-400 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300`}
          style={{ width: '170px' }}
          disabled={isLoading}
        >
          Cancel
        </button>
        <ToastContainer />
      </div>
    </div>
  )
}
