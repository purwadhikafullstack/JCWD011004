import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_BASE_URL

const initialState = {
  courier: {},
  isCourier: true,
  wait: false,
  selectedCourierData: {},
  selectedAddress: {}
}

export const CourierReducer = createSlice({
  name: 'Courier',
  initialState,
  reducers: {
    storeCourier: (state, action) => {
      state.courier = action.payload
    },
    isCourierAvailable: (state, action) => {
      state.isCourier = action.payload
    },
    courierDataWait: (state, action) => {
      state.wait = action.payload
    },
    selectedCourierData: (state, action) => {
      state.selectedCourierData = action.payload
    },
    setAddress: (state, action) => {
      state.selectedAddress = action.payload
    }
  }
})

export const getCourier = (
  userCityId,
  latitude,
  longitude,
  weight,
  courier
) => {
  const userLatitude = parseFloat(latitude)
  const userLongitude = parseFloat(longitude)
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    dispatch(courierDataWait(true))
    try {
      const { data } = await axios.post(
        `${apiUrl}/ongkir/cost`,
        {
          userCityId,
          userLatitude,
          userLongitude,
          weight,
          courier
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      dispatch(storeCourier(data))
      dispatch(courierDataWait(false))
    } catch (err) {
      dispatch(courierDataWait(false))
      dispatch(isCourierAvailable(false))
    }
  }
}

export const {
  storeCourier,
  isCourierAvailable,
  courierDataWait,
  selectedCourierData,
  setAddress
} = CourierReducer.actions
export default CourierReducer.reducer
