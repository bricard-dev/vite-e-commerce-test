import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: undefined,
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    ['cart/createCartItem']: (state, action) => {
      state.items.find(
        (product) => product.id === action.payload.id
      ).picked = true;
    },
  },
});

export function getProductsList() {
  return function (dispatch, getState) {
    fetch('/data/inventory.json')
      .then((res) => res.json())
      .then((data) => dispatch(addProduct(data.products)));
  };
}

export const { addProduct } = products.actions;
export default products.reducer;
