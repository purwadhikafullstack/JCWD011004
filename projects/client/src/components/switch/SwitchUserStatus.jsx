import React, { useState, useEffect } from 'react'

const SwitchUserStatus = ({ status, change }) => {
  const [isOn, setIsOn] = useState(status)
  const toggleSwitch = () => {
    setIsOn(!isOn)
    change(!isOn)
  }

  useEffect(() => {}, [isOn])

  return (
    <button
      onClick={toggleSwitch}
      className={`w-12 h-6 flex items-center bg-${
        isOn ? 'orange-700' : 'black'
      } rounded-full p-1 duration-300 ease-in-out`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        } duration-300 ease-in-out`}
      ></div>
    </button>
  )
}

export default SwitchUserStatus
