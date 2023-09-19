import React from 'react'
import Navbar from '../components/navbar/navbar'
import Banner from '../components/homePage/banner'
import CardList from '../components/homePage/cardList'
import Category from '../components/homePage/category'
import Footer from '../components/homePage/footer'

function HomePage() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Navbar />
      <Banner />
      <Category />
      <CardList />
      <Footer />
    </div>
  )
}

export default HomePage
