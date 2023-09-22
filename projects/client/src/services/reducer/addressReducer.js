import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addAddress: false
}

export const AddressReducer = createSlice({
  name: 'AddressReducer',
  initialState,
  reducers: {
    openAddAddress: (state, action) => {
      state.addAddress = action.payload
    }
  }
})

export const { openAddAddress } = AddressReducer.actions
export default AddressReducer.reducer
