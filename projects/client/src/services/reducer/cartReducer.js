import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    productIds: []
  },
  reducers: {
    increment: (state, action) => {
      if (!state.productIds.includes(action.payload)) {
        state.count += 1
        state.productIds.push(action.payload)
      }
    },
    setCount: (state, action) => {
      state.count = action.payload
      state.productIds = []
    }
  }
})

export const { increment, setCount } = cartSlice.actions

export default cartSlice.reducer
