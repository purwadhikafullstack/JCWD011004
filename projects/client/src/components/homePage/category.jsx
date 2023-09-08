import React from 'react'

function CategoryList() {
  const categories = ['Chairs', 'Sofas', 'Table', 'Wardrobe', 'Bed']

  return (
    <nav className="bg-gray-900 text-white py-2 px-4 xl:px-24">
      <div className="flex justify-center items-center">
        <ul className="flex justify-between w-full max-w-screen-lg">
          {categories.map((category, index) => (
            <li
              key={index}
              className="text-lg font-semibold hover:text-gray-400 transition duration-300 ease-in-out"
            >
              <a href="#">{category}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default CategoryList
