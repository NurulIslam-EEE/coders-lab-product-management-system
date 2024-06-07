import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderModal: false,
  editData: null,
  viewData: null,
  selectedProducts: [],
};

export const productsSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    openOrderModal: (state, action) => {
      state.orderModal = action.payload;
    },
    addSelectProduct: (state, action) => {
      const existing = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existing) {
        existing.quantity = existing.quantity + 1;
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

export const { openOrderModal, addSelectProduct } = productsSlice.actions;

export default productsSlice.reducer;
