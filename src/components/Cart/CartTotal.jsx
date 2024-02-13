import { useState } from "react";
import { useSelector } from "react-redux"
import {loadStripe} from "@stripe/stripe-js"
import api from "../../components/api/Auth.services"
import { message } from "antd";
const CartTotal = () => {
    const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
    const cartItems  = useSelector((state) => state.cart.cart);

    //state yaradaraq deyerimizi check edirik
    //Ve kargonun qiymetini toplam malimizin uzerine check edirik
    const [fastCargoCheked, setFastCargoCheked] = useState(false);
    //Burada deyirem ki get cartItemsin icerisinde ki datani mapla ve yeni qiymeti total quantitiy vur 
    // sonra yekun neticeni mene return ile don
    const cartItemTotals = cartItems.map((item) => {
        const itemTotal = item.price.current * item.quantity

        return itemTotal
    });


    const user  = localStorage.getItem("userToken") ? localStorage.getItem("userToken")
    : null


    //Burada ise deyirem ki get reducer ile toplama isi gor
    //Get menim toplam neqeder urun secmisem ise o urunlerin
    //Qiymetlerini topla ve cemini elde et. Bunu reducerle edirik ve bize callBack qaytarir
    const subTotal = cartItemTotals.reduce((previousValue, currentValue) => {
        return previousValue  +currentValue;
    }, 0);
   

    // Burada cargonun qiymetin yaziram
    // Daha sonra deyirem ki menim umumi toplam urunlerimin toplanmis qiymetinin ustune
    // Kargo qiymetini gelirsen. Gelende true olur tezden eger umumi qiymetden cixmaq istedikde false olur
    // Ve gozel terefi odur ki secdiyimiz her hanisa urunu sildiyimizde qiymetde avtomatik silinir
       const cargoFee = 15;
       const cartTotals = fastCargoCheked 
       ? (subTotal + cargoFee).toFixed(2) 
       : subTotal.toFixed(2);


   // Stripe ile Odeme islemi
   const handlePayment = async() => {
    if(!user){
        return message.info("Ödəmə əməliyyatı etmək üçün giriş etməlisiniz!")
    }
     const body = {
        products: cartItems,
        user: user,
        cargoFee: fastCargoCheked ? cargoFee : 0
     };
     console.log(body);

     try {
        const stripe = await loadStripe(stripePublicKey);

        const response = await api.post(`/payment`,body);
        console.log(response.data);

        if(!response.data){
            message.error("Ödeme işlemi başarısız oldu.")
            return;
        }

        const sessionData = await response.data;
        const result = await stripe.redirectToCheckout({
            sessionId:sessionData.id,
        });
        if(result.error){
            throw new Error(result.error.message) //stripe paketinin oz errorun qaytara bilir

        }
     } catch (error) {
        console.log(error);
     }
   }

  return (
    <div className="cart-totals">
    <h2>Cart totals
    </h2>
    <table>
        <tbody>
            <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td>
                    <span id="subtotal">${subTotal.toFixed(2)}</span>
                </td>
            </tr>
            <tr>
                <th>Shipping</th>
                <td>
                    <ul>
                        <li>
                            <label>
                                Fast Cargo: ${cartTotals}
                                <input type="checkbox" id="fast-cargo" 
                                checked={fastCargoCheked} onChange={() => setFastCargoCheked(!fastCargoCheked)}
                                />
                            </label>
                        </li>
                        <li>
                            <a href="#">Change Address</a>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>Total</th>
                <td>
                    <strong id="cart-total">${cartTotals}</strong>
                </td>
            </tr>
        </tbody>
    </table>
    <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>Proceed to checkout</button>
    </div>
</div>
  )
}

export default CartTotal
