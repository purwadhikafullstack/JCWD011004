import React from 'react'

function GeneralPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  paginate
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex justify-center items-center space-x-2">
      <button
        className={`text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1 && currentPage < 2}
      >
        <span aria-hidden="true">«</span>
        <span className="sr-only">Previous</span>
      </button>
      {pageNumbers.map((number) => (
        <h1
          key={number}
          className={`w-10 h-10 text-gray-500 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full ${
            currentPage === number ? 'bg-orange-500 text-white' : ''
          }`}
          onClick={() => paginate(number)}
        >
          {number}
        </h1>
      ))}
      <button
        className={`text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next</span>
        <span aria-hidden="true">»</span>
      </button>
    </nav>
  )
}

export default GeneralPagination
