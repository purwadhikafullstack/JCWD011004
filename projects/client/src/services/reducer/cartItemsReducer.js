import { createSlice } from '@reduxjs/toolkit'

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: {
    items: []
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    }
  }
})

export const { setItems } = cartItemsSlice.actions

export default cartItemsSlice.reducer
