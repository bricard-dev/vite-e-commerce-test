import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createCartItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    updateItemFromSelect: (state, action) => {
      state.cartItems.find((item) => item.id === action.payload.id).quantity =
        Number(action.payload.value);
    },
    deleteFromCart: (state, action) => {
      const indexOfItemToRemove = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems.splice(indexOfItemToRemove, 1);
    },
  },
});

export function addOneToCart(action) {
  return function (dispatch, getState) {
    const storeState = getState();

    const isAlreadyPresent = storeState.cart.cartItems.find(
      (item) => item.id === action
    );

    if (!isAlreadyPresent) {
      const itemToAdd = storeState.products.items.find(
        (product) => product.id === action
      );

      const newCartItem = {
        ...itemToAdd,
        quantity: 1,
      };

      dispatch(createCartItem(newCartItem));
    }
  };
}

export const { createCartItem, updateItemFromSelect, deleteFromCart } =
  cart.actions;
export default cart.reducer;
