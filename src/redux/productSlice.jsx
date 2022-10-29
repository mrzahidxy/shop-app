import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    searchProduct: [],
  },
  reducers: {
    searchProduct: (state, { type, payload }) => {
      state.searchProduct = state.products.filter((product) =>
        product.title.toLowerCase().includes(payload)
      );
    },
  },
});

export const { searchProduct } = productSlice.actions;
export default productSlice.reducer;
