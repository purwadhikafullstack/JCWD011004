import { configureStore } from '@reduxjs/toolkit'
import getAllProduct from './reducer/productReducer'

export const store = configureStore({
  reducer: {
    dataProduct: getAllProduct
  }
})
