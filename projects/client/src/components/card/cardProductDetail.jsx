import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function ProductDetailPage() {
  const [productData, setProductData] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
    try {
      const apiUrl = 'http://localhost:8000/api/cart/addItem'
      const data = {
        cartId: 5,
        productId: 1,
        quantity
      }

      const response = await axios.post(apiUrl, data)
      alert(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`)
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  const handleRemoveFromCart = async () => {
    try {
      const apiUrl = 'http://localhost:8000/api/cart/removeItem'

      const data = {
        cartId: 5,
        productId: 1,
        quantity
      }

      const response = await axios.put(apiUrl, data)
      alert(`${quantity} item${quantity > 1 ? 's' : ''} removed from cart!`)
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  useEffect(() => {
    const apiurl = `http://localhost:8000/api/product/4`

    const fetchData = async () => {
      try {
        const response = await axios.get(apiurl)
        setProductData(response.data)
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    fetchData()
  }, [])

  if (!productData) {
    return <p>Loading...</p>
  }

  const productImages = productData.Product_Images.map(
    (imageObj) => imageObj.image
  )

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-4 md:flex">
        <div className="md:w-1/2 p-4">
          <Carousel>
            {productImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product Image ${index}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold">{productData.name}</h2>
          <p className="mb-4 text-lg">{productData.description}</p>
          <p className="mb-4 text-xl font-bold">IDR {productData.price}</p>
          <div className="flex items-center justify-center mb-4">
            <button
              className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1)
                }
              }}
            >
              −
            </button>
            <input
              type="number"
              className="px-4 py-2 text-center bg-gray-100 rounded-full mx-2"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (!isNaN(value) && value >= 1) {
                  setQuantity(value)
                }
              }}
            />
            <button
              className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
              onClick={handleRemoveFromCart}
            >
              Remove Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
