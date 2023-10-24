import React, { useEffect, useState } from 'react'
import Card from '../card/cardProduct'
import Dropdown from '../dropdown/dropdownSort'
import DropdownCategory from '../dropdown/dropdownCategory'
import { useDispatch, useSelector } from 'react-redux'
import {
  // getAllProducts,
  getCategoryIdx
} from '../../services/reducer/productReducer'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// eslint-disable-next-line
const baseUrl = process.env.REACT_APP_API_BASE_URL

function CardList() {
  const { category } = useParams()
  const categoryNumber = parseInt(category)
  const dispatch = useDispatch()
  const sortIdx = useSelector((state) => state.dataProduct.sortIdx)
  const categoryIdx = useSelector((state) => state.dataProduct.categoryIdx)
  const [currentPage, setCurrentPage] = useState(1)
  const [stateActiveProduct, setactiveProduct] = useState([])
  const [loading, setLoading] = useState(true)

  const totalPage = stateActiveProduct.totalPages

  const fetchData = async () => {
    const baseEndpoint = `all?${
      categoryIdx === 0 ? '' : `categoryId=${categoryIdx}&`
    }limit=12&sort=`

    const sortEndpoints = {
      0: `${baseEndpoint}1&page=${currentPage}`,
      1: `${baseEndpoint}2&page=${currentPage}`,
      2: `${baseEndpoint}3&page=${currentPage}`
    }

    const endpoint = sortEndpoints[sortIdx]

    if (endpoint) {
      try {
        const { data } = await axios.get(`${baseUrl}/product/${endpoint}`)
        if (data) {
          const dataActive = data?.products?.filter(
            (product) => product.isActive === true
          )
          setactiveProduct(dataActive)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    dispatch(getCategoryIdx(categoryNumber))
  }, [])

  useEffect(() => {
    fetchData()
  }, [sortIdx, currentPage, categoryIdx])

  useEffect(() => {
    setCurrentPage(1)
  }, [sortIdx, categoryIdx])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage)
    }
  }

  return (
    <>
      <div className=" flex items-center my-2 pl-5  border-t border-gray-500 border-b">
        <span className="mr-2 my-4 font-semibold">Category:</span>
        <DropdownCategory />
      </div>
      <div className="flex items-center justify-end mr-4 my-2">
        <span className="mr-2">Sort By:</span>
        <Dropdown />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-4">
          {stateActiveProduct.map((data, index) => (
            <Card key={index} product={data} />
          ))}
        </div>
      )}
      <div className="flex items-center justify-center m-4">
        {totalPage > 1 && (
          <div className="flex items-center mb-20">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-orange-500 text-white w-24 py-2 rounded-l ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } px-3 py-2 ${index === 0 ? 'rounded-l' : ''} ${
                  index === totalPage - 1 ? 'rounded-r' : ''
                } cursor-pointer`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
              className={`bg-orange-500 text-white w-24 py-2 rounded-r ${
                currentPage === totalPage
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CardList
