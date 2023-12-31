import React from 'react'
import EditAccount from './component/edit account/EditAccount'
import ImageUpload from './component/profile photo/ImageUpload'
import EditAddress from './component/address/FormAddress'
import UserDashboardNavbar from './component/navbar/UserDashboardNavbar'
import './styles.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
function UserDashboard() {
  const [menu, setMenu] = useState({ accountData: true, alamat: false })
  const [userData, setUserData] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAccountdata = () => {
    setMenu(() => ({ accountData: true, alamat: false }))
  }

  const handleAlamat = () => {
    setMenu(() => ({ accountData: false, alamat: true }))
  }

  const handleUserdata = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${apiUrl}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserData(res?.data?.userInfo)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(handleUserdata, [])

  return (
    <div className="section-dashboard gap-10 px-2 mb-24 h-max flex-grow">
      <h1 className="mb-8 text-3xl font-bold flex max-[1200px]:justify-center ">
        User Dashboard
      </h1>
      <div className="flex px-24 gap-3 justify-around max-[1200px]:flex-col max-[1200px]:gap-7 max-[1200px]:items-center">
        <UserDashboardNavbar
          openAccountData={handleAccountdata}
          openAlamat={handleAlamat}
          menu={menu}
        />
        {menu?.accountData ? (
          <>
            <EditAccount userData={userData} loading={loading} />
            <ImageUpload />
          </>
        ) : (
          <EditAddress />
        )}
      </div>
    </div>
  )
}

export default UserDashboard
