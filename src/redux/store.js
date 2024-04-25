import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart.slice"; 
import authReducer from "./slices/auth.slice";
import categoryReducer from "./slices/category.slice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authReducer,
        category: categoryReducer,
    },
});

export default store;