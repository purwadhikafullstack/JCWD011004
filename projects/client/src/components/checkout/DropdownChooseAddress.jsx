import { useEffect, useState } from 'react'
import { PiPencilLineDuotone } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import {
  addressDataId,
  getAllAddress,
  openAddAddress
} from '../../services/reducer/addressReducer'
import { ToastContainer } from 'react-toastify'
import { getCourier, storeCourier } from '../../services/reducer/courierReducer'

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

  if (selectedAddress > 0) {
    let userAddress = addressData?.filter((item) => item.id == selectedAddress)
    dispatch(
      getCourier(
        userAddress[0].cityId,
        userAddress[0].latitude,
        userAddress[0].longitude,
        3454,
        'jne'
      )
    )
  } else {
    dispatch(storeCourier({}))
  }
  return (
    <div>
      <div>
        <select
          value={selectedAddress}
          onChange={handleAddressChange}
          className="flex bg-white rounded-lg my-2 p-2 text-xs text-left w-60"
        >
          <option value="" disabled>
            Select an address
          </option>
          {addressData?.map((address, index) => (
            <option key={index} value={address.id}>
              {`${address.name} (${address.phone})`}
            </option>
          ))}
        </select>
        {selectedAddress && (
          <div className="bg-white rounded-lg p-2 text-xs text-left w-60">
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
