import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_BASE_URL
// First, create the async thunk
export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    const token = localStorage.getItem('token') // replace 'token' with your actual local storage key
    const response = await axios.get(`${apiUrl}/cart/items`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.map((item) => item.productId)
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    productIds: [],
    status: 'idle',
    error: null
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched products to the array
        state.productIds = state.productIds.concat(action.payload)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})
export const { increment, setCount } = cartSlice.actions

export default cartSlice.reducer
