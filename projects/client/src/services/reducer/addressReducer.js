import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  addAddress: 0,
  provinceData: { province_id: '1', province: 'Bali' },
  cityRegency: {
    city_id: '17',
    province_id: '1',
    province: 'Bali',
    type: 'Kabupaten',
    city_name: 'Badung',
    postal_code: '80351'
  },
  allAddress: [],
  addressDataId: ''
}

export const AddressReducer = createSlice({
  name: 'AddressReducer',
  initialState,
  reducers: {
    openAddAddress: (state, action) => {
      state.addAddress = action.payload
    },
    provinceData: (state, action) => {
      state.provinceData = action.payload
    },
    cityRegencyData: (state, action) => {
      state.cityRegency = action.payload
    },
    allAddress: (state, action) => {
      state.allAddress = action.payload
    },
    addressDataId: (state, action) => {
      state.addressDataId = action.payload
    }
  }
})

export const getAllAddress = () => {
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/update/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      dispatch(allAddress(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const {
  openAddAddress,
  provinceData,
  cityRegencyData,
  allAddress,
  addressDataId
} = AddressReducer.actions
export default AddressReducer.reducer
