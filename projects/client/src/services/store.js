import { configureStore } from '@reduxjs/toolkit'
import getAllProduct from './reducer/productReducer'
import cartReducer from './reducer/cartReducer'
import cartItemsReducer from './reducer/cartItemsReducer'

export const store = configureStore({
  reducer: {
    dataProduct: getAllProduct,
    cart: cartReducer,
    cartItems: cartItemsReducer
  }
})
