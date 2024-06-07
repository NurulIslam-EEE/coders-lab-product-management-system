import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import productReducer from "./features/productsSlice";
import orderReducer from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
