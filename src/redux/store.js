import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./slices/Cart.slice"


const store  = configureStore({
    reducer: {
        cart: CartSlice,
    }
});

export default store;