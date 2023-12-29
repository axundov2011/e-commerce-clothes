import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import CartSlice from "./slices/Cart.slice";
import authSlice from "./slices/Auth.slice";
import categorySlice from "./slices/category.slice";



const store  = configureStore({
    reducer: {
        cart: CartSlice,
        auth: authSlice,
        category: categorySlice,

    },
});

export default store;