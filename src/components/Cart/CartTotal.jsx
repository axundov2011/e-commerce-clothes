import { useState } from "react";
import { useSelector } from "react-redux"

const CartTotal = () => {
    const cartItems  = useSelector((state) => state.cart.cart);

    //state yaradaraq deyerimizi check edirik
    //Ve kargonun qiymetini toplam malimizin uzerine check edirik
    const [fastCargoCheked, setFastCargoCheked] = useState(false);
    //Burada deyirem ki get cartItemsin icerisinde ki datani mapla ve yeni qiymeti total quantitiy vur 
    // sonra yekun neticeni mene return ile don
    const cartItemTotals = cartItems.map((item) => {
        const itemTotal = item.price.newPrice * item.quantity

        return itemTotal
    });
    console.log(fastCargoCheked, 'fastCargoCheked');


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
       const cartTotals = fastCargoCheked ? (subTotal + cargoFee).toFixed(2) : subTotal.toFixed(2);




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
        <button className="btn btn-lg">Proceed to checkout</button>
    </div>
</div>
  )
}

export default CartTotal
