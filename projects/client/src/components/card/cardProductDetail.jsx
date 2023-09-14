import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

function ProductDetailPage({ id }) {
  const [productData, setProductData] = useState(null)

  const handleAddToCart = () => {
    toast.success('Item added to cart!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: false
    })
  }

  useEffect(() => {
    const apiurl = `http://localhost:8000/api/product/2`

    const fetchData = async () => {
      try {
        const response = await axios.get(apiurl)
        setProductData(response.data)
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    fetchData()
  }, [id])

  if (!productData) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full bg-white rounded-lg overflow-y-auto m-3 p-3">
        <div className="p-3 justify-center items-center">
          <img
            src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/281/0728155_PE736115_S4.webp"
            alt="Product Image"
            className="mx-auto block w-250 h-250 object-cover rounded-t-lg border-radius-lg"
          />
        </div>
        <div className="text-left p-3">
          <h2 className="text-2xl font-semibold">{productData.name}</h2>
          <p className="mb-4 text-gray-600">{productData.description}</p>
          <p className="mb-4 text-m font-bold">IDR {productData.price}</p>
          <div className="mt-4 flex justify-between items-center">
            <button
              className="px-3 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
