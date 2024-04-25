import "./ProductItem.css"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cart.slice";
import { Link, useNavigate } from "react-router-dom";
const ProductItem = ({ productItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart)

  //redux-toolkit
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: productItem._id,
      name: productItem.name,
      img: productItem.img,
      price: productItem.price,
      quantity: 1
    }));
  };

  //Burda deyirem ki eger cartItem.id beraberdirse productItem.id sine 
  //yani men eyni mehsulun id'si olanlari seciremse mene engel qoy yani disablede bu fonksiyinu kecir 
  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
    );
  //Bu normal  bir componenti elaqeder edecek funksiyadir
  // const addToCart  = (cartItem) => { 
  //   //setCartItems([...cartItems, product]); Bu birinci yoldur
  //   setCartItems((prevCart) => [...prevCart, cartItem]); 
  // }

 
  //Orginal qiymeti
   const originalPrice = productItem?.price.current;
   //Endirimli qiymet
   const discountPercentage = productItem?.price.discount;

   //Endirim qiymeti hesablama
   const discountedPrice =  originalPrice - (originalPrice * discountPercentage) / 100;

   
  return (

    <div className="product-item glide__slide glide__slide--active" >
      <div className="product-image">
        <a href="#">

        <img src={productItem.img[0]} alt="" className="img1" />
          <img src={productItem.img[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">{productItem.name}</a>
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
          <strong className="new-price">{discountedPrice.toFixed(2)
          /*Burada tofixed ile reqemin sonuna sifir artira bilirsen */}</strong>
          <span className="old-price">{originalPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{productItem.price.discount}%</span>
        <div className="product-links">
          <button className="add-to-cart" disabled={filteredCart} onClick={handleAddToCart}>
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`product/${productItem._id}`} className="product-link" >
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

