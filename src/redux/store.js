import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./slices/cart.slice.js";
import authSlice from "./slices/auth.slice.js";
import categorySlice from "./slices/category.slice.js";



const store  = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        category: categorySlice,

    },
});

export default store;