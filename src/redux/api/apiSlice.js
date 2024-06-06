import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://reactjr.coderslab.online/api/products
// https://dummyjson.com/

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "ttps://reactjr.coderslab.online/api/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
  }),
});

export const { useGetProductsQuery } = api;
