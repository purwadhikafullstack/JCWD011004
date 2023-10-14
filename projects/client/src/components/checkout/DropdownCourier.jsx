import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import {
  getCourier,
  isCourierAvailable
} from '../../services/reducer/courierReducer'

export const DropdownCourier = () => {
  const dispatch = useDispatch()
  const dataCourier = useSelector((state) => state.dataCourier.courier)
  const costCourier = dataCourier?.courier?.results[0].costs
  const { userData } = useSelector((state) => state.dataAddress.allAddress)
  const addressData = userData
  const isCourier = useSelector((state) => state.dataCourier.isCourier)
  const isWait = useSelector((state) => state.dataCourier.wait)

  const [selectedCourier, setSelectedCourier] = useState('')
  const [selectedCourierType, setSelectedCourierType] = useState('')
  const dataAllCourier = ['jne', 'pos', 'tiki']

  const handleCourierChange = (event) => {
    setSelectedCourier(event.target.value)
    dispatch(isCourierAvailable(true))
    dispatch(
      getCourier(
        addressData[event.target.value]?.cityId,
        addressData[event.target.value]?.latitude,
        addressData[event.target.value]?.longitude,
        3454,
        dataAllCourier[event.target.value]
      )
    )
  }

  useEffect(() => {
    if (!isCourier) {
      const toastId = toast.error(
        'Selected courier is unavailable. Please choose another one.',
        {
          position: toast.POSITION.TOP_CENTER
        }
      )
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
  }, [isCourier])

  const handleCourierTypeChange = (event) => {
    setSelectedCourierType(event.target.value)
  }
  if (dataCourier.success) {
    return (
      <div>
        <div>
          <select
            value={selectedCourier}
            onChange={handleCourierChange}
            className="flex bg-white rounded-lg my-2 p-2 text-xs text-left w-60"
          >
            <option value="" disabled>
              Select a courier
            </option>
            {dataAllCourier.map((courier, index) => (
              <option key={index} value={index}>
                {courier}
              </option>
            ))}
          </select>
          {selectedCourier !== '' && isCourier && (
            <div className="w-60">
              <select
                className="bg-white rounded-lg p-2 text-xs text-left w-60"
                value={selectedCourierType}
                onChange={handleCourierTypeChange}
              >
                {isWait ? (
                  <option value="">Please Wait..</option>
                ) : (
                  <option value="" disabled>
                    Select a courier type
                  </option>
                )}
                {costCourier &&
                  costCourier?.map((cost, index) => (
                    <option key={index} value={cost.service}>
                      <span>{`(${cost.service}) ${cost.description}`}</span>
                      <span>{`Ongkir (${cost.cost[0].value}), Estimasi ${cost.cost[0].etd}`}</span>
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    )
  }
}
