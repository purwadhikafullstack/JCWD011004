import { configureStore } from '@reduxjs/toolkit'
import getAllProduct from './reducer/productReducer'
import getAllAddress from './reducer/addressReducer'

export const store = configureStore({
  reducer: {
    dataProduct: getAllProduct,
    dataAddress: getAllAddress
  }
})
