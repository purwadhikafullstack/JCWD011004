import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function RegularButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      style={{ width: '170px' }}
    >
      {text}
    </button>
  )
}

export function UploadButton({ productId }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Silakan pilih gambar terlebih dahulu.')
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('receipt', selectedFile)

      const response = await axios.post(
        `http://localhost:8000/api/payment/proof/${productId}`,
        formData
      )
      console.log('API Response:', response.data)
      toast.success('Gambar berhasil diunggah!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsLoading(false)
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
      <div className="grid grid-cols-2 mt-4">
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
        <ToastContainer />
      </div>
    </div>
  )
}
