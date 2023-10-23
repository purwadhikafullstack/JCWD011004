import React, { useEffect, useState } from 'react'
import axios from 'axios'

// eslint-disable-next-line
const baseUrl = process.env.REACT_APP_API_BASE_URL

function CategoryList() {
  const [result, setResult] = useState([])

  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/product/allCategory`)
      setResult(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <nav className="bg-gray-900 text-white py-2 px-4 xl:px-24">
      <div className="flex justify-center items-center">
        <ul className="flex justify-between w-full max-w-screen-lg">
          {result.map((category, index) => (
            <li
              key={index}
              className="text-lg font-semibold hover:text-gray-400 transition duration-300 ease-in-out"
            >
              <a href={`/product/${index + 1}`}>{category.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default CategoryList
