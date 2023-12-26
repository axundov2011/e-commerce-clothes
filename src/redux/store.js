import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import CartSlice from "./slices/Cart.slice";
import authSlice from "./slices/Auth.slice";



const store  = configureStore({
    reducer: {
        cart: CartSlice,
        auth: authSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck:false,
    })
});

export default store;