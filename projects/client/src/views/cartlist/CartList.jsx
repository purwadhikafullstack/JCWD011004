import React, { useEffect, useState } from 'react'
import CartCard from './component/CartCard'
import CheckOutCart from './component/CheckOutCart'
import CartPagination from './component/CartPagination'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setItemPrice, setItems } from '../../services/reducer/cartItemsReducer'
import CartSort from './component/CartSort'
import { BsFillCartXFill } from 'react-icons/bs'
import ModalDeleteItem from './component/ModalDeleteItem'
import CheckoutCard from '../../components/checkout/checkoutCardList'
import { ToastContainer } from 'react-toastify'

function CartList() {
  const [totalPages, setTotalPages] = useState(0)
  const [sort, setSort] = useState('newest')
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState({})
  const [subTotal, setSubTotal] = useState([])
  const dataTrigger = useSelector((state) => state.cartItems.triggerPrice)
  const isCheckout = useSelector((state) => state.checkoutData.isCheckout)
  // eslint-disable-next-line
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cartItems.items)

  const handleOpenShowModalDelete = (item) => {
    setShowModalDelete(true)
    setDeleteProduct(item)
  }
  const handleCloseShowModalDelete = () => {
    setShowModalDelete(false)
  }

  const handleSubTotalChange = (item, isChecked) => {
    setSubTotal((prevSubTotal) => {
      if (isChecked) {
        const existingItem = prevSubTotal.find(
          (i) => i.productId === item.productId
        )

        if (existingItem) {
          return prevSubTotal.map((i) =>
            i.productId === item.productId ? item : i
          )
        } else {
          return [...prevSubTotal, item]
        }
      } else {
        return prevSubTotal.filter((i) => i.productId !== item.productId)
      }
    })
  }

  const handleSortChange = (newSort) => {
    setSort(newSort)
  }

  const fetchData = async (page = 1, size = 5) => {
    try {
      const token = localStorage.getItem('token') // get token from local storage
      const response = await axios.get(
        `${apiUrl}/cart/list-items?page=${page}&size=${size}&sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response)
      setTotalPages(response?.data?.totalPages)
      dispatch(setItems(response?.data?.items))
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [dataTrigger])

  useEffect(() => {
    dispatch(setItemPrice(subTotal))
  }, [subTotal, items])

  return (
    <div>
      <div className="h-full bg-gray-100 py-24 px-10 flex flex-col gap-5 mt-10 flex-grow">
        <h1 className=" text-left text-2xl font-bold max-[760px]:mt-16">
          {isCheckout ? 'Checkout Items' : 'Cart Items'}
        </h1>
        {!isCheckout ? (
          <CartSort onSortChange={handleSortChange} fetchData={fetchData} />
        ) : (
          ''
        )}
        <div className="mx-auto max-w-5xl justify-center gap-6  md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {isCheckout ? (
              <CheckoutCard />
            ) : items[0] ? (
              items.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  handleOpenShowModalDelete={handleOpenShowModalDelete}
                  handleSubTotal={handleSubTotalChange}
                />
              ))
            ) : (
              <div className="container justify-between mb-10 rounded-lg bg-white  p-10 shadow-md sm:flex sm:justify-start overflow-hidden">
                <h2 className=" flex text-xl">
                  Keranjang&nbsp;Kosong&nbsp;
                  <BsFillCartXFill />
                </h2>
              </div>
            )}
          </div>
          <CheckOutCart />
        </div>
        {!isCheckout ? (
          <CartPagination fetchData={fetchData} totalPages={totalPages} />
        ) : (
          ''
        )}
        <ModalDeleteItem
          showModalDelete={showModalDelete}
          handleCloseShowModalDelete={handleCloseShowModalDelete}
          deleteProduct={deleteProduct}
          fetchData={fetchData}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default CartList
