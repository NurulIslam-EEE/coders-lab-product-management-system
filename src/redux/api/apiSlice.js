import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: "https://reactjr.coderslab.online/api/",
  })(args, api, extraOptions);

  // Do something with response status code
  // console.log("base", baseResult.meta?.response);

  return baseResult;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["orders", "products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, pageNumber }) =>
        `products?search=${search}&per_page=10&page=${pageNumber}`,
      providesTags: ["products"],
    }),
    postProduct: builder.mutation({
      query: ({ data }) => ({
        url: `products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getOrders: builder.query({
      query: ({ search, pageNumber }) =>
        `orders?search=${search}&per_page=10&page=${pageNumber}`,
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
  useDeleteProductMutation,
  usePostProductMutation,
  useGetOrdersQuery,
  usePostOrderMutation,
  useDeleteOrderMutation,
} = api;
