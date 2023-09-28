import React from 'react'
import UpdateButton from '../../../../../components/firebase/SocialUpdate'

function ViewUserData({ userData, handleShowEditPassword }) {
  return (
    <table className="table-auto text-left">
      <tbody>
        <tr>
          <td>Username:</td>
          <td>{userData?.username ? userData?.username : 'kosong'}</td>
        </tr>
        <tr>
          <td>First Name:</td>
          <td>{userData?.firstName ? userData?.firstName : 'kosong'}</td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td>{userData?.lastName ? userData?.lastName : 'kosong'}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{userData?.email ? userData?.email : 'kosong'}</td>
        </tr>
        <tr>
          <td>GoogleAuth:</td>
          <td>{userData?.google ? '✔' : <UpdateButton />}</td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>{userData?.phoneNumber ? userData?.phoneNumber : 'kosong'}</td>
        </tr>
        <tr className="mb-10">
          <td>Password:</td>
          <td>
            <a
              onClick={handleShowEditPassword}
              className="font-bold text-end text-blue-700 hover:text-blue-500 cursor-pointer active:text-black"
            >
              Change password
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ViewUserData
