import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
// import cartSlice from "./slices/cart.slice"
import { cartReducer } from "./slices/cart.slice";
import authSlice from "./slices/Auth.slice";
import categorySlice from "./slices/category.slice";



const store  = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authSlice,
        category: categorySlice,

    },
});

export default store;