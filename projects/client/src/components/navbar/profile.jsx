import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const navigate = useNavigate()

  const fetchImage = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        'http://localhost:8000/api/update/avatars',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setAvatar(response.data)
    } catch (error) {
      setAvatar(null)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleProfile = () => {
    navigate('/user-dashboard')
  }
  const handleMyOrder = () => {
    navigate('/sidebar-pemesanan')
  }

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-orange-300"
      >
        <img
          src={
            avatar
              ? avatar?.avatar
              : 'https://img.icons8.com/pastel-glyph/512/person-male--v3.png'
          }
          alt="Avatar"
          className="w-9 h-9 rounded-full"
        />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleProfile}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </button>
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </button>
            <button
              onClick={handleMyOrder}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              My Order
            </button>
            <button
              onClick={handleSignOut}
              className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-800"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
