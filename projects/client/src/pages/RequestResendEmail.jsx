import React, { useState, useEffect } from 'react'

function RequestResendEmail() {
  const [time, setTime] = useState(60 * 60)
  const [isActive, setIsActive] = useState(true)
  const [disabled, setIsDisabled] = useState(false)

  useEffect(() => {
    let timer = null
    if (isActive && time > 0) {
      setIsDisabled(true) // Disable the button
      timer = setInterval(() => setTime(time - 1), 1000)
    } else {
      setIsDisabled(false) // Enable the button
    }
    return () => clearInterval(timer)
  }, [isActive, time])

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleResendEmail = () => {
    setIsActive(false) // Stop the timer
    setTime(60 * 60) // Reset the timer to 1 hour
    setIsActive(true) // Start the timer again
    // Add your resend email logic here
  }

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <h1 className="text-4xl font-sans text-blue-700">
        Silahkan cek email untuk verifikasi
      </h1>
      <h2 className="text-xl font-medium">{formatTime(time)}</h2>
      <div className="flex gap-4">
        <h2 className="self-center">Kirim Ulang verification email</h2>
        <button
          onClick={handleResendEmail}
          disabled={disabled}
          className={
            disabled
              ? 'bg-blue-400 rounded-full px-5 py-2 text-white'
              : 'bg-blue-600 hover:bg-blue-400 active:bg-blue-600 rounded-full px-5 py-2 text-white'
          }
        >
          Resend Email
        </button>
      </div>
    </div>
  )
}

export default RequestResendEmail
