import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'http://localhost:8000/'

const initialState = {
  allProducts: {}
}

export const ProductReducer = createSlice({
  name: 'ProductReducer',
  initialState,
  reducers: {
    allDataProduct: (state, action) => {
      state.allProducts = action.payload
    }
  }
})

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${baseUrl}api/product/all`)
      console.log(data)
      dispatch(allDataProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const { allDataProduct } = ProductReducer.actions
export default ProductReducer.reducer
