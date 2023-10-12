import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import AddToCartButton from './components/AddToCartButton'
// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
function ProductDetailPage({ id }) {
  const [productData, setProductData] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const apiurl = `${apiUrl}/product/${id}`

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
    <div className="flex items-center justify-center min-h-screen mt-24">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg p-4 md:flex">
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
            <AddToCartButton
              productId={id}
              isProductActive={productData?.Warehouse_Products[0]?.stock}
            />
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
