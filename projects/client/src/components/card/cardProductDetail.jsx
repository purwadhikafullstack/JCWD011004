// ProductDetailPage.js
// import React, { useState, useEffect } from 'react'

// const ProductDetailPage = ({ match }) => {
//   const [product, setProduct] = useState(null)
//   //   const productId = match.params.id

//   useEffect(() => {
//     // Fungsi untuk mengambil detail produk dari API
//     const fetchProductDetail = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/api/product/${productId}`
//         )
//         if (!response.ok) {
//           throw new Error('Product not found')
//         }
//         const productData = await response.json()
//         setProduct(productData)
//       } catch (error) {
//         console.error(error)
//         // Handle error (misalnya, tampilkan pesan bahwa produk tidak ditemukan)
//       }
//     }

//     fetchProductDetail()
//   }, [productId])

//   if (!product) {
//     // Menampilkan pesan atau spinner saat data masih diambil
//     return <p>Loading...</p>
//   }

//   return (
//     <div className="flex items-center justify-center">
//       <div className="p-3 m-3 bg-white rounded-lg shadow-lg w-40 lg:w-56 h-auto">
//         <div className="p-3">
//           <img
//             src=https://www.google.com/search?q=anjing&oq=anjing&aqs=chrome.0.0i131i355i433i512j46i131i433i512l2j0i131i433i650j46i131i433i512j46i433i512l2j46i131i433i512l2j0i512.3804j0j7&sourceid=chrome&ie=UTF-8#vhid=sxvhYWsWgX25EM&vssid=l
//             alt="Product Image"
//             className="m-auto w-36 h-36 object-cover rounded-t-lg"
//           />
//         </div>
//         <div className="text-center">
//           <h2 className="mb-4 text-xl font-semibold">Babi</h2>
//           <p className="mb-4 text-gray-600 truncate">Anjing</p>
//           <p className="mb-4 text-m font-bold">IDR 20000</p>
//         </div>
//         <div className="pb-3 text-center">
//           <button
//             className="px-4 py-2 bg-orange-300 text-black rounded-full hover:bg-orange-400 focus:outline-none"
//             onClick={() => {
//               alert('Item added to cart!')
//             }}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductDetailPage

import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ProductDetailPage() {
  return (
    <div className="flex justify-center">
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <div className="p-3">
          <img
            src="https://akcdn.detik.net.id/community/media/visual/2022/11/18/ilustrasi-anak-anjing_43.jpeg?w=700&q=90"
            alt="Product Image"
            className="mx-auto w-60 h-60 object-cover rounded-full"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Babi</h2>
          <p className="text-gray-600">Anjing</p>
          <p className="mt-2 text-lg font-bold text-orange-500">IDR 200,001</p>
        </div>
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none"
            onClick={() => {
              alert('Item added to cart!')
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
