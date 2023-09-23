import React from 'react'
import Navbar from '../components/navbar/navbar'
import ProductDetailPage from '../components/card/cardProductDetail'
import Footer from '../components/homePage/footer'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <div className="container mx-auto max-w-screen-lg">
      <Navbar />
      <ProductDetailPage id={id} />
      <Footer />
    </div>
  )
}
