import CartCupon from "./CartCupon"
import CartProgres from "./CartProgres"
import CartTable from "./CartTable"
import CartTotal from "./CartTotal"
import "./Cart.css"
import { useSelector } from "react-redux"
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cart)

    return (
        <div>
            <section className="cart-page">
                <div className="container">
                   {
                    cartItems.length > 0 ?  <div className="cart-page-wrapper">
                    <form className="cart-form">
                        <CartProgres />
                        <div className="shop-table-wrapper">
                            <CartTable />
                            <CartCupon />
                        </div>
                    </form>
                    <div className="cart-collaterals">
                        <CartTotal />
                    </div>
                </div> : <h2>Sepette hiç ürün yoohh!</h2>
                   }
                </div>
            </section>
        </div>
    )
}

export default Cart
