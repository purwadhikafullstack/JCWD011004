import { createSlice } from '@reduxjs/toolkit'

export const checkoutData = createSlice({
  name: 'checkoutData',
  initialState: {
    isCheckout: false
  },
  reducers: {
    setIsCheckout: (state, action) => {
      state.isCheckout = action.payload
    }
  }
})

export const { setIsCheckout } = checkoutData.actions

export default checkoutData.reducer
