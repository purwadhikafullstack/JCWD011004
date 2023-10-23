import React from 'react'
import './Styles.css'
import { Address } from './Address'
import { AddAddress } from './AddAddress'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { openAddAddress } from '../../../../services/reducer/addressReducer'
import { UpdateAddress } from './UpdateAddress'

function EditAddress() {
  const add = useSelector((state) => state.dataAddress.addAddress)
  const dispatch = useDispatch()
  const handleAddAddress = () => {
    dispatch(openAddAddress(add === 1 ? 0 : 1))
  }

  return (
    <div className="show-account">
      <div className="section-header mb-5 flex justify-between">
        <h2 className="font-sans font-bold">Address Information</h2>
        <a onClick={handleAddAddress} className="cursor-pointer">
          <AiOutlineFileAdd />
        </a>
      </div>
      {add === 0 ? <Address /> : add === 1 ? <AddAddress /> : <UpdateAddress />}
    </div>
  )
}

export default EditAddress
