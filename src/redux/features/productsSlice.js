import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  editData: null,
  viewData: null,
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
