  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
      //Burada biz diyoruz ki, getItem ile cartItems güncellendiğinde, değerler sıfırlanmasın. 
      //Yani cart state'i localStorage'a yazıldığında ve içi doluysa, silinmesin, boşsa boş görünsün 
      cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  };

  const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
          addToCart: (state, action) => {
            const {id, quantity, ...cart} = action.payload;
            // Eğer ürün zaten sepete eklenmişse, sadece miktarını güncelle
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
            state.cart = action.payload; // Yerel depolamadan yüklenen öğeleri ata
          }
      },
  });

  export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;
  export default cartSlice.reducer;
  
  