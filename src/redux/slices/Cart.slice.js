import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    //Burada biz deyirik ki getItem ile cartItems update oldugunda aldigi deyerler sifirlanmasin. 
    //Yani cart statesi eyer localStorageye yazdirilirsa ve ici doludursa silinmesin yox bosdursa bos gorunsun 
    cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],

};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
          const {id, quantity, ...cart} = action.payload;
          //urun zaten sebete eklenibse, sadece miqdarini yenile
          const existingProduct = state.cart.find(item => item.id === id);
          if(existingProduct){
            existingProduct.quantity += quantity;
          } else {
            state.cart.push({id, quantity, ...cart});
          }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        setCartItems:(state, action) => {
          state.cart = action.payload; //Yerel depolamadan yüklenen öğeleri ata
        }
    },
    //Bu değişiklikle, addToCart fonksiyonuna gönderilen aksiyon nesnesi { id, quantity } şeklinde olmalıdır. Eğer ürün zaten sepette varsa, sadece miktarı artırır; aksi takdirde, yeni bir öğe olarak ekler.
//Bu örnekte, action.payload içinde id ve quantity özellikleri bekleniyor. Eğer bu aksiyonu gönderiyorsanız, bu güncellenmiş fonksiyonu kullanabilirsiniz.
});

export const { addToCart, removeFromCart,setCartItems } = cartSlice.actions;
export  const  cartReducer = cartSlice.reducer;

export default cartSlice.reducer;