import React from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/homePage/footer'
import UserDashboard from '../views/userdashboard/UserDashboard'

function UserDashboardPage() {
  return (
    <div className="container mx-auto max-w-screen-lg h-full flex flex-col gap-24">
      <Navbar />
      <UserDashboard />
      <Footer />
    </div>
  )
}

export default UserDashboardPage
