import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import BeatLoader from 'react-spinners/BeatLoader'
import { useParams, useNavigate } from 'react-router-dom'
function VerifyEditAccount() {
  const [loading, setLoading] = useState(false)
  const { token } = useParams()
  const nav = useNavigate()
  const handleVerify = async () => {
    try {
      setLoading(true)
      const res = await axios.patch(
        `http://localhost:8000/api/update/verify?token=${token}`
      )
      if (res.status === 200) {
        setLoading(false)
        nav('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleVerify()
  }, [])

  return (
    <div className="flex h-screen w-screen justify-center items-center ">
      <h1 className={loading ? 'hidden' : 'font-bold text-2xl text-cyan-700'}>
        Informasi anda telah terupdate
      </h1>
      <BeatLoader className="" loading={loading} color="#60A5FA" />
    </div>
  )
}

export default VerifyEditAccount
