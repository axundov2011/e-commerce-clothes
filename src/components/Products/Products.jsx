import React, { useEffect, useState } from "react"
import {useSelector} from "react-redux";
import ProductItem from "./ProductItem"
import ProductData from "../../Data.json"
import Slider from "react-slick";
import "./Products.css"


const Products = () => {
  const [products] = useState(ProductData)

  //CartItems stateni bir ust pagede ona gore yaradiriq ki butun cartlari umumi ehate etsin
  // Cun ki biz direk "ProductItems" componentinin icerisinde bu stateni yarattigimizda
  //Sadece birinci secdiyimiz productu bir nece defe secerken eyni stateye daxil edir misal [1,2,3,4,5(array)]
  const cartItems = useSelector((state) => state.cart.cart)
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems])
  console.log(cartItems, 'cartItems');

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
              {products.map((product) => (
                <ProductItem cartItems={cartItems}  productItem={product} key={product.id} />
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
