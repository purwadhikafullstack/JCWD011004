import { useEffect } from 'react'
import { PiPencilLineDuotone } from 'react-icons/pi'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
  addressDataId,
  getAllAddress,
  openAddAddress
} from '../../../../services/reducer/addressReducer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export const Address = () => {
  const { userData } = useSelector((state) => state.dataAddress.allAddress)
  const addressData = userData
  const add = useSelector((state) => state.dataAddress.addAddress)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAddress())
  }, [])

  const deleteAddress = async (id) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/update/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status === 200) {
        toast.success('Delete address succeed', {
          position: toast.POSITION.TOP_CENTER
        })
        dispatch(getAllAddress())
      }
    } catch (err) {
      console.log(err.message)
      toast.error(err.response.data.error, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const handleShowEdit = (index) => {
    dispatch(openAddAddress(add === 0 ? 2 : 0))
    dispatch(addressDataId(index))
  }

  const handleDeleteAddress = (index) => {
    deleteAddress(addressData[index].id)
  }

  return (
    <div>
      {addressData?.map((address, index) => (
        <div
          key={index}
          className="bg-white rounded-lg my-2 p-2 text-sm text-left"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className="section-header flex justify-between">
            <p className="font-semibold">{`${address?.name} (${address?.phone})`}</p>
            <div className="flex">
              <a
                onClick={() => {
                  handleShowEdit(index)
                }}
                className="cursor-pointer px-2"
              >
                <PiPencilLineDuotone />
              </a>
              <a
                onClick={() => {
                  handleDeleteAddress(index)
                }}
                className="cursor-pointer px-2"
              >
                <BsFillTrash3Fill />
              </a>
            </div>
          </div>
          <p>{address?.address}</p>
          <p>{`${address?.subdistrict}, ${address?.cityRegency}, ${address?.province}`}</p>
          <p>{`Indonesia ${address?.postalcode}`}</p>
        </div>
      ))}
      <ToastContainer />
    </div>
  )
}
