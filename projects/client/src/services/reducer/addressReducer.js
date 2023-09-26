import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addAddress: false,
  provinceId: 1
}

export const AddressReducer = createSlice({
  name: 'AddressReducer',
  initialState,
  reducers: {
    openAddAddress: (state, action) => {
      state.addAddress = action.payload
    },
    provinceData: (state, action) => {
      state.provinceId = action.payload
    }
  }
})

export const { openAddAddress, provinceData } = AddressReducer.actions
export default AddressReducer.reducer
