import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'http://localhost:8000/'

const initialState = {
  allProducts: {},
  sortIdx: 0,
  categoryIdx: 0
}

export const ProductReducer = createSlice({
  name: 'ProductReducer',
  initialState,
  reducers: {
    allDataProduct: (state, action) => {
      state.allProducts = action.payload
    },
    getSortIdx: (state, action) => {
      state.sortIdx = action.payload
    },
    getCategoryIdx: (state, action) => {
      state.categoryIdx = action.payload
    }
  }
})

export const getAllProducts = (paramUrl) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${baseUrl}api/product/${paramUrl}`)
      dispatch(allDataProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const { allDataProduct, getSortIdx, getCategoryIdx } =
  ProductReducer.actions
export default ProductReducer.reducer
