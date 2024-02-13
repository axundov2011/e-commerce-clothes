import { useState } from "react"
import api from "../../components/api/Auth.services"
import { message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setCartItems } from "../../redux/slices/Cart.slice"
const CartCupon = ({cartItems}) => {
  const [couponCode, setCouponCode] = useState("")
  const dispatch = useDispatch();

  const applyCoupon = async() => {
    if(couponCode.trim().length === 0){
      return message.warning("Boş dəyər yaza bilmərsiniz!")
    }
    try {
      const response = await api.get(`/coupons/code/${couponCode}`);
      const data = await response.data;
      console.log(data,'data');

      console.log(cartItems,'cartItems');
      const discountPercent = data.discountPercent
      const updateCartItems = cartItems?.map((items) => {
      const updatePrice = items.price * (1 - discountPercent / 100);
      return {...items, price: updatePrice}
    });
     dispatch(setCartItems(updateCartItems))
    console.log(updateCartItems,'updateCartItems')
    message.success(`Siz uğurla ${couponCode} nömrəli  kuponu daxil etdiniz!`)
    } catch (error) {
      console.log(error);
      return  message.warning("Daxil etdiyiniz kupon kodu etibarsızdır")
    }
    
   
  }
  return (
    <div className="actions-wrapper">
    <div className="coupon">
        <input 
         type="text" 
         className="input-text" 
         placeholder="Coupon code" 
         onChange={(e) => setCouponCode(e.target.value)}
         value={couponCode}
         />
          <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
    </div>
    <div className="update-cart">
        <button className="btn">Update Cart</button>
    </div>
</div>
  )
}

export default CartCupon
