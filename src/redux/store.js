import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./slices/cart.slice";
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