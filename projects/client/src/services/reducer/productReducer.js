import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// eslint-disable-next-line
const baseUrl = process.env.REACT_APP_API_BASE_URL

const initialState = {
  allProducts: {},
  sortIdx: 0,
  isWarehouseProduct: false,
  categoryIdx: 0,
  isLogin: localStorage.getItem('token')
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
    },
    isLogin: (state, action) => {
      state.isLogin = action.payload
    },
    triggerWarehouseProduct: (state, action) => {
      state.isWarehouseProduct = action.payload
    }
  }
})

export const getAllProducts = (paramUrl) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${baseUrl}/product/${paramUrl}`)
      dispatch(allDataProduct(data))
      return data
    } catch (err) {
      console.log(err)
    }
  }
}

export const {
  allDataProduct,
  getSortIdx,
  getCategoryIdx,
  isLogin,
  triggerWarehouseProduct
} = ProductReducer.actions
export default ProductReducer.reducer
