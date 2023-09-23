import React from 'react'
import Carousel from './carousel'

function Banner() {
  return (
    <>
      <div className="mt-36 bg-orange-100 px-4 py-6 text-black md:mt-16">
        <div className="container mx-auto">
          <p className="text-center pb-4">
            Welcome to AKUI website! Special offer: 10% off everything - Use
            code AKUIAKU10%
          </p>
          <div className="flex justify-center">
            <Carousel />
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
