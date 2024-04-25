import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart.slice"; 
import authReducer from "./slices/auth.slice";
import categoryReducer from "./slices/category.slice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        category: categoryReducer,
    },
});

export default store;