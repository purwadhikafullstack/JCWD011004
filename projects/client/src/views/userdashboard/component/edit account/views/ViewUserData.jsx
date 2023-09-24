import React from 'react'
import UpdateButton from '../../../../../components/firebase/SocialUpdate'
function ViewUserData({ userData, handleShowEditPassword }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between">
        <label>username :</label>
        <p className="font-bold">
          {userData?.username ? userData?.username : 'kosong'}
        </p>
      </div>
      <div className="flex gap-2 justify-between">
        <label>First Name :</label>
        <p className="font-bold">
          {userData?.firstName ? userData?.firstName : 'kosong'}
        </p>
      </div>
      <div className="flex gap-2 justify-between">
        <label>Last Name :</label>
        <p className="font-bold">
          {userData?.lastName ? userData?.lastName : 'kosong'}
        </p>
      </div>
      <div className="flex gap-1 justify-between">
        <label>Email&nbsp;:</label>
        <p className="font-bold">
          {userData?.email ? userData?.email : 'kosong'}
        </p>
      </div>
      <div className="flex gap-1 justify-between">
        <label>GoogleAuth&nbsp;:</label>
        <p className="font-bold">
          {userData?.google ? '✔' : <UpdateButton />}
        </p>
      </div>
      <div className="flex gap-2 justify-between">
        <label>Phone :</label>
        <p className="font-bold">
          {userData?.phoneNumber ? userData?.phoneNumber : 'kosong'}
        </p>
      </div>
      <div className="mb-10 flex  gap-2 justify-between">
        <label>Password&nbsp;: </label>
        <a
          onClick={handleShowEditPassword}
          className="font-bold text-end text-blue-700 hover:text-blue-500 cursor-pointer
  active:text-black"
        >
          Change password
        </a>
      </div>
    </div>
  )
}

export default ViewUserData
