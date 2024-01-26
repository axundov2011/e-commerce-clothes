import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/Cart.slice";
const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  console.log(cartItem,'cartItems');
  
  const handleRemoveCart = () => {
    dispatch(removeFromCart(cartItem.id))
  }
  
 
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
<td>${price ? price.toFixed(2) : "N/A"}</td>
<td className="product-quantity">{cartItem.quantity}</td>
<td className="product-subtotal">
${(price && cartItem.quantity) ? (price * cartItem.quantity).toFixed(2) : "N/A"}

</td></tr>
  )
}

export default CartItem
