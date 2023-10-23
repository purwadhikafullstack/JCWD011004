import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCount } from '../../services/reducer/cartReducer'
// eslint-disable-next-line
const apiUrl = process.env.REACT_APP_API_BASE_URL
function CartIcons() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.cart.count) // access count from Redux store
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/cart/items`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(setCount(response.data.length)) // set the count in the Redux store
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="relative scale-75 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-8 w-8 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50 ">
          {count}
        </span>
      )}
    </div>
  )
}

export default CartIcons
