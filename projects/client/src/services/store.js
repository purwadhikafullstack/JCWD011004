import { configureStore } from '@reduxjs/toolkit'
import getAllProduct from './reducer/productReducer'
import getAllAddress from './reducer/addressReducer'
import cartReducer from './reducer/cartReducer'
import cartItemsReducer from './reducer/cartItemsReducer'

export const store = configureStore({
  reducer: {
    dataProduct: getAllProduct,
    dataAddress: getAllAddress,
    cart: cartReducer,
    cartItems: cartItemsReducer
  }
})
