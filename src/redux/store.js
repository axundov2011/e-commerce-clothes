import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import cartSlice from "./slices/Cart.slice";
import authSlice from "./slices/auth.slice";
import categorySlice from "./slices/category.slice";



const store  = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        category: categorySlice,

    },
});

export default store;