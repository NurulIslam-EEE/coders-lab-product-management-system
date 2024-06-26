import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  confirmModal: false,
  editData: null,
  viewData: null,
  variants: [
    {
      id: 11,
      color: "black",
      specification: "Specification 1",
      size: "large",
    },
    {
      id: 12,
      color: "dark-blue",
      specification: "Specification 2",
      size: "medium",
    },
    {
      id: 13,
      color: "white",
      specification: "Specification 3",
      size: "small",
    },
    {
      id: 14,
      color: "black",
      specification: "Specification 4",
      size: "large",
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
    setConfirmModal: (state, action) => {
      state.confirmModal = action.payload;
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
export const { setModalOpen, addEditData, addViewData, setConfirmModal } =
  productsSlice.actions;

export default productsSlice.reducer;
