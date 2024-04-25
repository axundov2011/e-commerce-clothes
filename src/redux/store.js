import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {authReducer} from "./slices/auth.slice"
import cartSlice from "./slices/cart.slice";
// import authSlice from "./slices/auth.slice";
import categorySlice from "./slices/category.slice";



const store  = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authReducer,
        category: categorySlice,
    },
});

export default store;