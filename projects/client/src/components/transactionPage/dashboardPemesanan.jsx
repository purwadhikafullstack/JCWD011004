import React, { useState } from 'react'
import IconButton from '../button/button'

const DashboardPemesanan = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="bg-neutral-100 p-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard Pemesanan
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
        <div className="bg-green-400 rounded-lg p-4 hover:bg-green-500 transition-colors duration-300 ease-in-out transform hover:scale-105">
          <button className="text-xl font-semibold text-white focus:outline-none">
            Pesanan Saya
          </button>
        </div>
        <div className="bg-green-400 rounded-lg p-4 hover:bg-green-500 transition-colors duration-300 ease-in-out transform hover:scale-105">
          <button className="text-xl font-semibold text-white focus:outline-none">
            Riwayat Pemesanan Saya
          </button>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div>
            <IconButton
              text="Belum Bayar"
              onClick={handleButtonClick}
              isOpen={isOpen}
            />
          </div>
          <div>
            <IconButton text="Konfirmasi" />
          </div>
          <div>
            <IconButton text="Diproses" />
          </div>
          <div>
            <IconButton text="Dikirim" />
          </div>
          <div>
            <IconButton text="Diterima" />
          </div>
          <div>
            <IconButton text="Dibatalkan" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPemesanan
