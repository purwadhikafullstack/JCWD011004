import React from 'react'
import Card from '../card/cardProduct'
import Dropdown from '../dropdownSort/dropdown'
import DropdownCategory from './dropdownCategory'

function CardList() {
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
      <div className="grid grid-cols-2 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
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
