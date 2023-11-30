import CartCupon from "./CartCupon"
import CartProgres from "./CartProgres"
import CartTable from "./CartTable"
import CartTotal from "./CartTotal"
import "./Cart.css"
const Cart = () => {
    return (
        <div>
            <section className="cart-page">
                <div className="container">
                    <div className="cart-page-wrapper">
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
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart
