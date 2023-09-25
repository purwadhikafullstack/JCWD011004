import React, { useEffect } from 'react'
import CartCard from './component/CartCard'
import CheckOutCart from './component/CheckOutCart'
import CartPagination from './component/CartPagination'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../services/reducer/cartItemsReducer'
// import CartSort from './component/CartSort'

function CartList() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cartItems.items) // access items from Redux store
  console.log(items)

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token') // get token from local storage
      const response = await axios.get(
        'http://localhost:8000/api/cart/list-items?page=1&size=5',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      dispatch(setItems(response.data)) // set items in the Redux store
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <body>
      <div className="h-max bg-gray-100 p-24 flex flex-col gap-5 mt-10 flex-grow">
        <h1 className="mb-10 text-left text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {/* <CartSort /> */}
            {items
              ? items.map((item) => <CartCard key={item.id} item={item} />)
              : null}
          </div>
          <CheckOutCart />
        </div>
        <CartPagination />
      </div>
    </body>
  )
}

export default CartList
