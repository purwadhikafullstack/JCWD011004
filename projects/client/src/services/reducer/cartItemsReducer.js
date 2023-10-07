import { createSlice } from '@reduxjs/toolkit'

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: {
    items: [],
    totalItemPrice: [],
    triggerPrice: true
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    setItemPrice: (state, action) => {
      state.totalItemPrice = action.payload
    },
    setTriggerPrice: (state, action) => {
      state.triggerPrice = action.payload
    }
  }
})

export const { setItems, setItemPrice, setTriggerPrice } =
  cartItemsSlice.actions

export default cartItemsSlice.reducer
