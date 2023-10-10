import React, { useState, useEffect } from 'react'
import SidebarHead from './component/SidebarHead'
import MainHead from './component/MainHead'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024)

  useEffect(() => {
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
      {isSidebarOpen && <SidebarHead isSidebarOpen={isSidebarOpen} />}
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
