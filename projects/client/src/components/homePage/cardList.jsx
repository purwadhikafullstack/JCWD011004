import React, { useEffect } from 'react'
import Card from '../card/cardProduct'
import Dropdown from '../dropdownSort/dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../services/reducer/productReducer'

function CardList() {
  const dispatch = useDispatch()
  const result = useSelector((state) => state.dataProduct.allProducts.products)

  console.log(result)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      {/* <div className="my-2 pl-5 hover:text-orange-400 transition duration-300 ease-in-out border-t border-gray-500 border-b text-left">
        <a href="#" className="text-lg font-bold">
          SALE
        </a>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div> */}
      <div className="my-2 pl-5 hover:text-orange-400 transition duration-300 ease-in-out border-t border-gray-500 border-b text-left">
        <a href="/product" className="text-lg font-bold">
          ALL PRODUCT
        </a>
      </div>
      <div className="flex items-center justify-end mr-4 my-2">
        <span className="mr-2">Sort By:</span>
        <Dropdown />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4">
        {result
          ? result.map((data, index) => <Card key={index} product={data} />)
          : ''}
      </div>
    </>
  )
}

export default CardList
