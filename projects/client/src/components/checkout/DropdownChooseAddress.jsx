import { useEffect, useState } from 'react'
import { PiPencilLineDuotone } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import {
  addressDataId,
  getAllAddress,
  openAddAddress
} from '../../services/reducer/addressReducer'
import { ToastContainer } from 'react-toastify'

export const DropdownAddress = () => {
  const { userData } = useSelector((state) => state.dataAddress.allAddress)
  const addressData = userData
  const add = useSelector((state) => state.dataAddress.addAddress)
  const dispatch = useDispatch()
  const [selectedAddress, setSelectedAddress] = useState('')

  useEffect(() => {
    dispatch(getAllAddress())
  }, [])

  const handleShowEdit = (index) => {
    dispatch(openAddAddress(add === 0 ? 2 : 0))
    dispatch(addressDataId(index))
  }

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value)
  }

  return (
    <div>
      <div>
        <select
          value={selectedAddress}
          onChange={handleAddressChange}
          className="bg-white rounded-lg my-2 p-2 text-sm text-left"
        >
          <option value="">Select an address</option>
          {addressData?.map((address, index) => (
            <option key={index} value={address.id}>
              {`${address.name} (${address.phone})`}
            </option>
          ))}
        </select>
        {selectedAddress && (
          <div className="bg-white rounded-lg p-2 text-sm text-left">
            {addressData?.map((address, index) => {
              if (address.id == selectedAddress) {
                return (
                  <div key={address.id}>
                    <div className="flex float-right">
                      <a
                        onClick={() => {
                          handleShowEdit(index)
                        }}
                        className="cursor-pointer px-2"
                      >
                        <PiPencilLineDuotone />
                      </a>
                    </div>
                    <p>{address?.address}</p>
                    <p>{`${address?.subdistrict}, ${address?.cityRegency}, ${address?.province}`}</p>
                    <p>{`Indonesia ${address?.postalcode}`}</p>
                  </div>
                )
              }
              return null
            })}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}
