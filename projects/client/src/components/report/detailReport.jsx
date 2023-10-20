import React, { useState, useEffect } from 'react'

const DetailReport = () => {
  const headTabel = [
    'No',
    'Product',
    'From',
    'To',
    'Stock',
    'Actions',
    'Date',
    'Total Penambahan',
    'Total Pengurangan',
    'Stok Akhir'
  ]

  const [selectedMonth, setSelectedMonth] = useState('all')
  const [totalAddition, setTotalAddition] = useState(0)
  const [totalSubtraction, setTotalSubtraction] = useState(0)
  const [totalStock, setTotalStock] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const monthOptions = months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ))

  const tableData = [
    // Data contoh Anda
  ]

  const handleMonthFilterChange = (event) => {
    setSelectedMonth(event.target.value)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem)

  const filteredTableData =
    selectedMonth === 'all'
      ? currentItems
      : currentItems.filter((item) => item.date.includes(selectedMonth))

  useEffect(() => {
    let totalAddition = 0
    let totalSubtraction = 0
    let totalStock = 0

    currentItems.forEach((item) => {
      if (item.action === 'in') {
        totalAddition += item.quantity
      } else if (item.action === 'out') {
        totalSubtraction += item.quantity
      }

      totalStock = item.stock
    })

    setTotalAddition(totalAddition)
    setTotalSubtraction(totalSubtraction)
    setTotalStock(totalStock)
  }, [currentItems])

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(tableData.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredTableData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button key={number} onClick={() => setCurrentPage(number)}>
      {number}
    </button>
  ))

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Report</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium">Filter by Month:</label>
        <select
          className="w-40 py-2 px-3 border rounded-md"
          value={selectedMonth}
          onChange={handleMonthFilterChange}
        >
          <option value="all">All</option>
          {monthOptions}
        </select>
      </div>

      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              {headTabel.map((head, index) => (
                <th key={index} className="p-3">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((item) => (
              <tr key={item.id} className="bg-gray-100 text-center">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.product}</td>
                <td className="p-3">{item.from}</td>
                <td className="p-3">{item.to}</td>
                <td className="p-3">{item.stock}</td>
                <td className="p-3">{item.actions}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{totalAddition}</td>
                <td className="p-3">{totalSubtraction}</td>
                <td className="p-3">{totalStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Sebelumnya
        </button>
        {renderPageNumbers}
        <button
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(filteredTableData.length / itemsPerPage)
          }
          className="pagination-button"
        >
          Berikutnya
        </button>
      </div>
    </div>
  )
}

export default DetailReport
