import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderBanner = () => {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  }

  return (
    <div className="w-11/12">
      <Slider {...settings}>
        <div className="w-full">
          <img
            src="/banner/smallroomfeat.png"
            className="h-auto w-full border rounded-lg"
          />
        </div>
        <div className="w-full">
          <img
            src="/banner/grandopening.png"
            className="h-auto w-full border rounded-lg"
          />
        </div>
        <div className="w-full">
          <img
            src="/banner/lastsale.png"
            className="h-auto w-full border rounded-lg"
          />
        </div>
        <div className="w-full">
          <img
            src="/banner/newsale.png"
            className="h-auto w-full border rounded-lg"
          />
        </div>
      </Slider>
    </div>
  )
}

export default SliderBanner
