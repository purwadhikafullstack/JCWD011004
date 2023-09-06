import React from 'react'
import Card from './card'

function CardList() {
  return (
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
  )
}

export default CardList
