import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cart.slice";
const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  
  const handleRemoveCart = () => {
    dispatch(removeFromCart(cartItem.id))
  }

  useEffect(() => {
    removeFromCart();
  },[])
 
  const price = cartItem.price && cartItem.price.current;

  return (
    <tr className="cart-item">
    <td></td>
<td className="cart-image">
<img src={cartItem.img[0]} alt="" />
<i className="bi bi-x delete-cart" 
onClick={handleRemoveCart}
></i>
</td>
<td >{cartItem?.name}</td>
<td>${price && price.toFixed(2)}</td>
<td className="product-quantity">{cartItem.quantity}</td>
<td className="product-subtotal">{(price * cartItem.quantity).toFixed(2)}</td>
</tr>
  )
}

export default CartItem
