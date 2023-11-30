
import "./ProductItem.css"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/Cart.slice";
import { Link, useNavigate } from "react-router-dom";
const ProductItem = ({productItem}) => {
const dispatch = useDispatch();
const navigate = useNavigate();
const cartItems  = useSelector((state) => state.cart.cart)
console.log(cartItems, 'productCartItems');
  //redux-toolkit
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: productItem.id,
      name: productItem.name,
      img: productItem.img,
      price:productItem.price,
      quantity: 1    }));
  };
  console.log(navigate, 'navigate');
  //Burda deyirem ki eger cartItem.id beraberdirse productItem.id sine 
  //yani men eyni mehsulun id'si olanlari seciremse mene engel qoy yani disablede bu fonksiyinu kecir 
  const filteredCart = cartItems.find((cartItem) => cartItem.id === productItem.id)
console.log(filteredCart, 'filteredCart');
//Bu normal  bir componenti elaqeder edecek funksiyadir
// const addToCart  = (cartItem) => { 
//   //setCartItems([...cartItems, product]); Bu birinci yoldur
//   setCartItems((prevCart) => [...prevCart, cartItem]); 
// }

console.log(productItem.id, 'productItem.id');
  return (

         <div className="product-item glide__slide glide__slide--active" >
      <div className="product-image">
        <a href="#">
          
          <img src={productItem.img.singleImage} alt="" className="img1" />
          <img src={productItem.img.thumbs[2]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">Analogue Resin Strap</a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">{productItem.price?.newPrice.toFixed(2) 
          /*Burada tofixed ile reqemin sonuna sifir artira bilirsen */}</strong>
          <span className="old-price">{productItem.price?.oldPrice}</span>
        </div>
        <span className="product-discount">-{productItem.discount}%</span>
        <div className="product-links">
          <button className="add-to-cart" disabled={filteredCart} onClick={handleAddToCart}>
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`product/${productItem.id}`}  className="product-link" >
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  
  )
}

export default ProductItem
