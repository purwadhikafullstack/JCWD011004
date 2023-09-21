import React, { useState } from 'react'
import './styles.css'
function UserDashboardNavbar({ openAccountData, openAlamat, menu }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="navbar justify-start font-sans max-[1200px]:h-auto">
      <header className="flex border-b-4">
        <h2 className="font-bold text-2xl  mb-8">Dashboard</h2>
        <button
          className="ml-auto min-[1200px]:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </header>
      <section
        className={`flex flex-col items-start transition-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'h-auto' : 'h-0'
        } min-[1200px]::h-auto`}
      >
        <button
          onClick={openAccountData}
          className={menu?.accountData ? 'font-bold' : ''}
        >
          Account Data
        </button>
        <button
          onClick={openAlamat}
          className={menu?.alamat ? 'font-bold' : ''}
        >
          Alamat
        </button>
      </section>
    </div>
  )
}

export default UserDashboardNavbar
