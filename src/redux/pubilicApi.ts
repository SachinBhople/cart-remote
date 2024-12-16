import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product } from "./cartApi"



export interface ProductData extends Product {
    result: Product[]
}
export const pubilicApi = createApi({
    reducerPath: "pubilicApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/public" }),
    baseQuery: fetchBaseQuery({ baseUrl: "https://combine-backend.vercel.app/api/public" }),
    tagTypes: ["public"],
    endpoints: (builder) => {
        return {
            getAllproduct: builder.query<ProductData, void>({
                query: () => {
                    return {
                        url: `/all-products`,
                        method: "GET"
                    }
                },
                providesTags: ["public"]
            }),
            getproductDeailts: builder.query({
                query: id => {
                    return {
                        url: `/product-details/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["public"]
            }),
            addUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/apiEndPoint",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["public"]
            }),

        }
    }
})

export const { useGetproductDeailtsQuery, useGetAllproductQuery } = pubilicApi
