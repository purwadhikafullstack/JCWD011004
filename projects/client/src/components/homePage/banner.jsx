import React from 'react'

function Banner() {
  return (
    <div className="mt-16 bg-orange-100 p-6 text-black">
      <div className="container mx-auto">
        <p className="text-center pb-4">
          Welcome to AKUI website! Special offer: 10% off everything - Use code
          AKUIAKU10%
        </p>
        <img
          src="/banner/smallroomfeat.png"
          alt="Banner Image"
          className="mx-auto w-1500px h-100"
        />
      </div>
    </div>
  )
}

export default Banner
