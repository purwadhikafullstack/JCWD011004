import React from 'react'
import Card from '../card'

function CardList() {
  return (
    <>
      <div className="my-2 pl-5 hover:text-orange-400 transition duration-300 ease-in-out border-t border-gray-500 border-b text-left">
        <a href="#" className="text-lg font-bold">
          NEW
        </a>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="my-2 pl-5 hover:text-orange-400 transition duration-300 ease-in-out border-t border-gray-500 border-b text-left">
        <a href="#" className="text-lg font-bold">
          SALE
        </a>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}

export default CardList
