import React from 'react'
import './Styles.css'
import { Address } from './Address'
import { AddAddress } from './AddAddress'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { openAddAddress } from '../../../../services/reducer/addressReducer'

function EditAddress() {
  const add = useSelector((state) => state.dataAddress.addAddress)
  const dispatch = useDispatch()
  console.log(add)
  const handleAddAddress = () => {
    dispatch(openAddAddress(!add))
  }

  return (
    <div className="show-account">
      <div className="section-header mb-5 flex justify-between">
        <h2 className="font-sans font-bold">Edit Address Information</h2>
        <a onClick={handleAddAddress} className="cursor-pointer">
          <AiOutlineFileAdd />
        </a>
      </div>
      {add ? <AddAddress /> : <Address />}
    </div>
  )
}

export default EditAddress
