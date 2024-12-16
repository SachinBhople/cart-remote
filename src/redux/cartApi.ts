import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface ProductItem {
    product: string;
    qty: number;
}
export interface ProductRequest {
    // address: string,
    user: string,
    products: ProductItem[]

}
export interface Product {
    _id: string
    address: string,
    user: string,
    products: ProductItem[]

}
export interface Product {
    _id: string;
    name: string;
    desc: string;
    price: number;
    stock: number;
    mrp: number;
    images: string;
    active: boolean;
}


export interface Cartinfo {
    _id: string
    isDeleted?: boolean
    quantity: number,
    productId: Product,
    userId: string
}




export const cartApi = createApi({
    reducerPath: "cartApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user" }),
    baseQuery: fetchBaseQuery({ baseUrl: "https://combine-backend.vercel.app/api/user" }),
    tagTypes: ["cart"],
    endpoints: (builder) => {
        return {
            getcartProduct: builder.query<{ message: string, result: Cartinfo[] }, void>({
                query: (id) => {
                    return {
                        url: `get-all-product/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["cart"],
                transformResponse: (data: { message: string, result: Cartinfo[] }) => {
                    return data
                },
            }),
            addtoCart: builder.mutation({
                query: productData => {
                    return {
                        url: "/add-product",
                        method: "POST",
                        body: productData
                    }
                },
                invalidatesTags: ["cart"]
            }),
            deleteItemFromCart: builder.mutation({
                query: (id) => {
                    return {
                        url: `/delete-product/${id}`,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["cart"]
            }),
            emptyCart: builder.mutation({
                query: (id) => {
                    return {
                        url: `/delete-all-product/${id}`,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["cart"]
            }),
            placeOrder: builder.mutation<Product, ProductRequest>({
                query: productData => {
                    return {
                        url: `/place-order`,
                        method: "POST",
                        body: productData

                    }
                },
                invalidatesTags: ["cart"]
            }),

        }
    }
})

export const { useGetcartProductQuery, useAddtoCartMutation, useDeleteItemFromCartMutation, useEmptyCartMutation, usePlaceOrderMutation } = cartApi
