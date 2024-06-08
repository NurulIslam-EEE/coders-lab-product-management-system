import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reactjr.coderslab.online/api/",
  }),
  tagTypes: ["orders", "products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params = "") => `products?search=${params}`,
      providesTags: ["products"],
    }),
    getOrders: builder.query({
      query: (params = "") => `orders?search=${params}`,
      providesTags: ["orders"],
    }),
    postOrder: builder.mutation({
      query: ({ data }) => ({
        url: `orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOrdersQuery,
  usePostOrderMutation,
  useDeleteOrderMutation,
} = api;
