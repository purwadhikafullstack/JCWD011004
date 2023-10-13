import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  courier: {}
}

export const CourierReducer = createSlice({
  name: 'Courier',
  initialState,
  reducers: {
    storeCourier: (state, action) => {
      state.courier = action.payload
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
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/ongkir/cost',
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
      console.log(data)
      dispatch(storeCourier(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const { storeCourier } = CourierReducer.actions
export default CourierReducer.reducer
