import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./cartApi";
import { pubilicApi } from "./pubilicApi";
import { authApi } from "auth/authApi";
import authSlice from "auth/authSlice";

const reduxStore = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        [pubilicApi.reducerPath]: pubilicApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartApi.middleware, pubilicApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
