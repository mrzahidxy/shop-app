import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addCart: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeCart: (state, action) => {
      const removeItem = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.products = removeItem;
      state.total -= action.payload.price * action.payload.quantity;
      state.quantity -= 1;
    },
    removeFullCart: (state, action) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export const { addCart, removeCart, removeFullCart } = cartSlice.actions;
export default cartSlice.reducer;
