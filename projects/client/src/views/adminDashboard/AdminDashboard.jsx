import React, { useState, useEffect } from 'react'
import SidebarHead from './component/SidebarHead'
import MainHead from './component/MainHead'
// import DashboardReport from './component/DashboardReport'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_BASE_URL
const token = localStorage.getItem('token')
function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024)
  const [admin, setAdmin] = useState({})

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAdmin(data)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }
  useEffect(() => {
    fetchData()
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div>
      {isSidebarOpen && (
        <SidebarHead isSidebarOpen={isSidebarOpen} data={admin} />
      )}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <MainHead toggleSidebar={toggleSidebar} />
        <div className="px-6 pt-6 2xl:container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
