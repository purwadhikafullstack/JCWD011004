import React from 'react'

function CategoryList() {
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4']

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-center items-center">
        <ul className="flex space-x-7">
          {categories.map((category, index) => (
            <li
              key={index}
              className="hover:text-gray-400 transition duration-300 ease-in-out"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default CategoryList
