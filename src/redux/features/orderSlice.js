import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderModal: false,
  orderConfirmModal: false,
  editData: null,
  viewData: null,
  viewOrder: null,
  selectedProducts: [],
  variantsSelected: [],
  stepNo: 1,
  billingInformation: {
    name: "",
    email: "",
    address: "",
    total_quantity: 0,
    details: [],
  },
};

export const productsSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    openOrderModal: (state, action) => {
      state.orderModal = action.payload;
    },
    openOrderConfirmModal: (state, action) => {
      state.orderConfirmModal = action.payload;
    },
    addViewOrder: (state, action) => {
      state.viewOrder = action.payload;
    },
    addSelectProduct: (state, action) => {
      const existing = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existing) {
        // existing.quantity = existing.quantity + 1;
        state.selectedProducts = state.selectedProducts.filter(
          (product) => product.id !== action.payload.id
        );
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    incDecStep: (state, action) => {
      if (action.payload && state.stepNo > 0 && state.stepNo < 3) {
        state.stepNo += 1;
      } else if (!action.payload && state.stepNo > 1 && state.stepNo < 4) {
        state.stepNo -= 1;
      }
    },
    resetStepNo: (state) => {
      state.stepNo = 1;
    },
    updateBillingInformation: (state, action) => {
      console.log("redux", action);
      state.billingInformation = {
        ...state.billingInformation,
        [action.payload.name]: action.payload.value,
      };
    },
    updateVariantsSelected: (state, action) => {
      state.variantsSelected = action.payload;
    },
  },
});

export const {
  openOrderModal,
  addSelectProduct,
  incDecStep,
  updateBillingInformation,
  updateVariantsSelected,
  openOrderConfirmModal,
  resetStepNo,
  addViewOrder,
} = productsSlice.actions;

export default productsSlice.reducer;
