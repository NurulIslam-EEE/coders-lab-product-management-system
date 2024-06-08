import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  editData: null,
  viewData: null,
  variants: [
    {
      variant_id: 11,
      color: "black",
      specification: "Specification 1",
      size: "S",
      quantity: 0,
    },
    {
      variant_id: 12,
      color: "dark-blue",
      specification: "",
      size: "M",
      quantity: 0,
    },
    {
      variant_id: 13,
      color: "white",
      specification: "",
      size: "XL",
      quantity: 0,
    },
    {
      variant_id: 14,
      color: "black",
      specification: "",
      size: "XXL",
      quantity: 0,
    },
  ],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    addEditData: (state, action) => {
      state.editData = action.payload;
    },
    addViewData: (state, action) => {
      state.viewData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalOpen, addEditData, addViewData } = productsSlice.actions;

export default productsSlice.reducer;
