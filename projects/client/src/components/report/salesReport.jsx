import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import jwtDecode from 'jwt-decode'

const user = () => {
  const token = localStorage.getItem('token')
  if (token) return jwtDecode(token)
}

function formatRupiah(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(price)
}

function SalesReport() {
  const [categoryReport, setCategoryReport] = useState([])
  const [overallCategoryTotal, setOverallCategoryTotal] = useState(0)
  const [overallCategoryQuantity, setOverallCategoryQuantity] = useState(0)
  const [productReport, setProductReport] = useState([])
  const [overallProductTotal, setOverallProductTotal] = useState(0)
  const [overallProductQuantity, setOverallProductQuantity] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [filter, setFilter] = useState('category')

  // eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/report/sales?year=${year}&month=${month}&filter=${filter}${
          user().warehouseId ? `&warehouseId=${user().warehouseId}` : ''
        }`
      )
      .then((response) => {
        setCategoryReport(response.data.categoryTotals)
        setOverallCategoryTotal(response.data.overallCategoryTotal)
        setOverallCategoryQuantity(response.data.overallCategoryQuantity)
        setProductReport(response.data.productTotals)
        setOverallProductTotal(response.data.overallProductTotal)
        setOverallProductQuantity(response.data.overallProductQuantity)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [year, month, filter])

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Quantity',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  })

  useEffect(() => {
    const categoryLabels = categoryReport?.map((category) => category.category)
    const categoryQuantities = categoryReport?.map(
      (category) => category.quantity
    )

    setBarChartData({
      labels: categoryLabels,
      datasets: [
        {
          label: 'Quantity',
          data: categoryQuantities,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    })
  }, [categoryReport])

  const [productBarChartData, setProductBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Quantity',
        data: [],
        backgroundColor: 'rgba(192, 75, 75, 0.2)',
        borderColor: 'rgba(192, 75, 75, 1)',
        borderWidth: 1
      }
    ]
  })

  useEffect(() => {
    const productLabels = productReport?.map((product) => product.product)
    const productQuantities = productReport?.map((product) => product.quantity)

    setProductBarChartData({
      labels: productLabels,
      datasets: [
        {
          label: 'Quantity',
          data: productQuantities,
          backgroundColor: 'rgba(192, 75, 75, 0.2)',
          borderColor: 'rgba(192, 75, 75, 1)',
          borderWidth: 1
        }
      ]
    })
  }, [productReport])

  return (
    <div className="p-4">
      <div className="mb-8 text-2xl font-semibold">{`Warehouse : ${
        user().warehouseName ? user().warehouseName : 'All'
      }`}</div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div>
          {/* Dropdowns for year and month */}
          <div className="mb-4 w-60">
            <label className="flex text-sm font-medium text-gray-700">
              Year :
            </label>
            <select
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500 sm:text-sm rounded-md"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from({ length: 5 }, (_, i) => {
                const yearOption = new Date().getFullYear() - i
                return (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="mb-4 w-60">
            <label className="flex text-sm font-medium text-gray-700">
              Month:
            </label>
            <select
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500 sm:text-sm rounded-md"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const monthValue = i + 1
                const monthName = new Date(
                  new Date().setMonth(i)
                ).toLocaleString('en-US', { month: 'long' })
                return (
                  <option key={monthValue} value={monthValue}>
                    {monthName}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Dropdown for filter selection */}
          <div className="mb-4 w-60">
            <label className="flex text-sm font-medium text-gray-700">
              Filter :
            </label>
            <select
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500 sm:text-sm rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="category">Category</option>
              <option value="product">Product</option>
            </select>
          </div>

          {filter === 'category' ? (
            <div>
              <h2 className="text-2xl font-semibold mt-12">
                Category Sales Chart
              </h2>
              <div style={{ height: '300px' }}>
                <Bar data={barChartData} />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mt-12">
                Product Sales Chart
              </h2>
              <div style={{ height: '300px' }}>
                <Bar data={productBarChartData} />
              </div>
            </div>
          )}

          <h1 className="text-2xl font-semibold mt-12">
            {filter === 'category'
              ? 'Category Sales Report'
              : 'Product Sales Report'}
          </h1>
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">
                    {filter === 'category' ? 'Category' : 'Product'}
                  </th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {filter === 'category' &&
                  categoryReport?.map((category) => (
                    <tr key={category.category}>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {category.category}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {category.quantity}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {formatRupiah(category.total.toFixed(2))}
                      </td>
                    </tr>
                  ))}
                {filter === 'product' &&
                  productReport?.map((product) => (
                    <tr key={product.product}>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {product.product}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {product.quantity}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {formatRupiah(product.total.toFixed(2))}
                      </td>
                    </tr>
                  ))}
                {filter === 'category' ? (
                  <tr>
                    <td className="font-semibold py-3 px-6 text-left whitespace-nowrap">
                      Total
                    </td>
                    <td className="font-semibold py-3 px-6 text-center">
                      {overallCategoryQuantity}
                    </td>
                    <td className="font-semibold py-3 px-6 text-center">
                      {formatRupiah(overallCategoryTotal)}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="font-semibold py-3 px-6 text-left whitespace-nowrap">
                      Total
                    </td>
                    <td className="font-semibold py-3 px-6 text-center">
                      {overallProductQuantity}
                    </td>
                    <td className="font-semibold py-3 px-6 text-center">
                      {formatRupiah(overallProductTotal)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default SalesReport
