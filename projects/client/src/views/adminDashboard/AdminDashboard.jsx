import React from 'react'
import SidebarHead from './component/SidebarHead'
import MainHead from './component/MainHead'
import DashboardReport from './component/DashboardReport'
function AdminDashboard() {
  return (
    <div>
      <SidebarHead />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <MainHead />
        <div className="px-6 pt-6 2xl:container">
          <DashboardReport />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
