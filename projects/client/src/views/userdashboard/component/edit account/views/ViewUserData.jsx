import React from 'react'

function ViewUserData({ userData, handleShowEditPassword }) {
  return (
    <>
      <div className="flex gap-2">
        <label>First Name :</label>
        <p className="font-bold">
          {userData?.firstName ? userData?.firstName : 'kosong'}
        </p>
      </div>
      <div className="flex  gap-2">
        <label>Last Name :</label>
        <p className="font-bold">
          {userData?.lastName ? userData?.lastName : 'kosong'}
        </p>
      </div>
      <div className="flex  gap-2">
        <label>Email :</label>
        <p className="font-bold">
          {userData?.email ? userData?.email : 'kosong'}
        </p>
      </div>
      <div className="flex  gap-2">
        <label>Phone:</label>
        <p className="font-bold">
          {userData?.phoneNumber ? userData?.phoneNumber : 'kosong'}
        </p>
      </div>
      <div className="mb-10 flex  gap-2">
        <label>Password :</label>
        <a
          onClick={handleShowEditPassword}
          className="font-bold text-blue-700 hover:text-blue-500 cursor-pointer
  active:text-black"
        >
          Change password
        </a>
      </div>
    </>
  )
}

export default ViewUserData
