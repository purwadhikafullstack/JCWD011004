import React, { useState } from 'react'

function CreateAdminButton() {
  const [isDisabled, setIsDisabled] = useState(false)
  const handleClick = () => {
    setIsDisabled(true)
  }
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`btn h-9 w-36  active:bg-orange-700 hover:bg-orange-400 ${
        isDisabled ? 'cursor-not-allowed bg-orange-400' : 'bg-orange-700'
      }`}
    >
      Create&nbsp;Admin
    </button>
  )
}

export default CreateAdminButton
