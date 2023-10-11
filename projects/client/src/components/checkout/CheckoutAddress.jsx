import React from 'react'
// import './Styles.css'
import { AddAddress } from '../../views/userdashboard/component/address/AddAddress'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { openAddAddress } from '../../services/reducer/addressReducer'
import { UpdateAddress } from '../../views/userdashboard/component/address/UpdateAddress'
import { DropdownAddress } from './DropdownChooseAddress'

function CheckoutAddress() {
  const add = useSelector((state) => state.dataAddress.addAddress)
  const dispatch = useDispatch()
  const handleAddAddress = () => {
    dispatch(openAddAddress(add === 1 ? 0 : 1))
  }

  return (
    <div className="bg-blue-100 p-4 rounded-md mb-4">
      <div className="flex justify-between">
        <h2 className="font-sans font-bold">Choose Delivery Address</h2>
        <a onClick={handleAddAddress} className="cursor-pointer">
          <AiOutlineFileAdd />
        </a>
      </div>
      {add === 0 ? (
        <DropdownAddress />
      ) : add === 1 ? (
        <AddAddress />
      ) : (
        <UpdateAddress />
      )}
    </div>
  )
}

export default CheckoutAddress
