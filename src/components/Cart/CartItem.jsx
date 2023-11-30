import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/Cart.slice";
const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  console.log(cartItem,'cartItems');
  
  const handleRemoveCart = () => {
    dispatch(removeFromCart(cartItem.id))
  }
  
 

  return (
    <tr className="cart-item">
    <td></td>
<td className="cart-image">
<img src={cartItem.img?.singleImage} alt="" />
<i className="bi bi-x delete-cart" 
onClick={handleRemoveCart}
></i>
</td>
<td >{cartItem?.name}</td>
<td>{cartItem.price.newPrice.toFixed(2)}</td>
<td className="product-quantity">{cartItem.quantity}</td>
<td className="product-subtotal">{(cartItem.price?.newPrice * cartItem.quantity).toFixed(2)}</td>
</tr>
  )
}

export default CartItem
