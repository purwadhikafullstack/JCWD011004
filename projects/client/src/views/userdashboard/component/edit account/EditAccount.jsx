import React from 'react'
import './Styles.css'
import { useState } from 'react'
import { PiPencilLineDuotone, PiPencilSlashDuotone } from 'react-icons/pi'
import BeatLoader from 'react-spinners/BeatLoader'
import EditUserData from './views/EditUserData'
import ViewUserData from './views/ViewUserData'
import ChangePasswordForm from './views/ChangePasswordForm'

function EditAccount({ userData, loading }) {
  const [edit, setEdit] = useState(false)
  const [changePassword, setChangePassword] = useState(false)

  const handleShowEdit = () => {
    edit ? setEdit(false) : setEdit(true), setChangePassword(false)
  }

  const handleShowEditPassword = () => {
    changePassword ? setChangePassword(false) : setChangePassword(true)
  }

  return (
    <div
      className={
        edit
          ? 'section-edit-acount'
          : !changePassword
          ? 'show-account h-auto'
          : 'change-password'
      }
    >
      <div className="section-header mb-5 flex justify-between">
        <h2 className="font-sans font-bold">Edit Account Information</h2>
        <a onClick={handleShowEdit} className="cursor-pointer">
          {edit ? <PiPencilSlashDuotone /> : <PiPencilLineDuotone />}
        </a>
      </div>
      {edit ? (
        <>
          <EditUserData handleShowEdit={handleShowEdit} userData={userData} />
        </>
      ) : (
        <>
          {!loading ? (
            <>
              <ViewUserData
                userData={userData}
                handleShowEditPassword={handleShowEditPassword}
              />
            </>
          ) : (
            <>
              {' '}
              <BeatLoader
                className="self-center"
                loading={loading}
                color="#60A5FA"
              />
            </>
          )}
        </>
      )}
      {changePassword ? (
        <ChangePasswordForm handleShowEditPassword={handleShowEditPassword} />
      ) : (
        ''
      )}
    </div>
  )
}

export default EditAccount
