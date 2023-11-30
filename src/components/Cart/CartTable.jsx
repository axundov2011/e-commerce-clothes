import { useSelector } from "react-redux"
import CartItem from "./CartItem"

const CartTable = () => {
    //Burada ise reduxdan getirdiyimiz silme funksiyani burada yaziriq ve parta part silirik!
  const cartItems = useSelector((state) => state.cart.cart)  
    return (
        <table className="shop-table">
            <thead>
                <tr>
                <th className="product-thumbnail">&nbsp;</th>
                <th className="product-thumbnail">&nbsp;</th>
                <th className="product-name">Product</th>
                <th className="product-price">Price</th>
                <th className="product-quantity">Quantity</th>
                <th className="product-subtotal">Subtotal</th>
                </tr>
            </thead>
            <tbody className="cart-wrapper"> 
           {
            cartItems.map((item, i) => (
                <CartItem cartItem={item} key={i} />
            ))
           }
            </tbody>
        </table>
    )
}

export default CartTable
