import React from 'react'
import Navbar from '../components/navbar/navbar'
import CartList from '../views/cartlist/CartList'
import Footer from '../components/homePage/footer'

function CartItemPages() {
  return (
    <div className="container mx-auto max-w-screen-lg h-screen flex flex-col">
      <Navbar />
      <CartList />
      <Footer />
    </div>
  )
}

export default CartItemPages
