import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "./ProductItem"
import Slider from "react-slick";
import "./Products.css"
import { fetchProducts } from "../../redux/slices/product.slice";
import { message } from "antd";


const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //CartItems stateni bir ust pagede ona gore yaradiriq ki butun cartlari umumi ehate etsin
  // Cun ki biz direk "ProductItems" componentinin icerisinde bu stateni yarattigimizda
  //Sadece birinci secdiyimiz productu bir nece defe secerken eyni stateye daxil edir misal [1,2,3,4,5(array)]
  const cartItems = useSelector((state) => state.cart.cart)
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems])

  useEffect(() => {
    const restFetProducts = async() => {
      setLoading(true);
      try {
          const response = await dispatch(fetchProducts());
          if (response.payload) {
            setProducts(response.payload);
          } else {
              message.error("Məlumatlar gəlmədi!")
          }
  
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
  };
  restFetProducts();
  },[dispatch, ]);

  const SliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // nextArrow: <NextBtn />,
    // prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    //caruselin  responsivi 
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      }
    ]
  }
console.log(products,'products');

  return (
    <div>
      <section className="products">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Summer Collection New Morden Design</p>
          </div>
          <div className="product-wrapper product-carousel">
            {/* <ul className="product-list glide__slides" id="product-list"> */}
            <Slider {...SliderSettings}>
              {products && products.map((product) => (
                <ProductItem   productItem={product} key={product._id} />
              ))}
            </Slider>
            {/* </ul> */}
            <div className="glide__arrows" data-glide-el="controls">
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
