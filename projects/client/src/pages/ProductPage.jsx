import React from 'react'
import Navbar from '../components/navbar/navbar'
import CardList from '../components/productPage/cardList'

function ProductPage() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Navbar />
      <div className="mt-20">
        <CardList />
      </div>
    </div>
  )
}

export default ProductPage
