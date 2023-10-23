import React, { useState, useEffect } from 'react'

function CartPagination({ fetchData, totalPages }) {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      fetchData(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      fetchData(currentPage + 1)
    }
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={handlePreviousClick}
            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages).keys()].map((_, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`${
                currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'
              } border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextClick}
            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default CartPagination
