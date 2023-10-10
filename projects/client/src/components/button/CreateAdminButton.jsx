import React from 'react'

function CreateAdminButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn h-9 w-36  active:bg-orange-700 hover:bg-orange-400 bg-orange-700`}
    >
      Create&nbsp;Admin
    </button>
  )
}

export default CreateAdminButton
