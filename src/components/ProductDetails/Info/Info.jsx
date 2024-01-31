import { useDispatch } from "react-redux";
import "./Info.css"
import { addToCart } from "../../../redux/slices/Cart.slice";
import { useRef } from "react";
const Info = ({ singleProduct }) => {
     
    const dispatch = useDispatch();
    const quantityRef = useRef();
   
    const originalPrice = singleProduct.price.current;
    const discountPercentage = singleProduct.price.discount;

    const discountedPrice 
    = originalPrice - (originalPrice * discountPercentage) / 100

 
    const {addToCart} = useDispatch(addToCart);
    // const handleAddToCart = () => {
    //     dispatch(addToCart({
    //         ...singleProduct,
    //         price:discountedPrice,
    //         id: singleProduct?._id,
    //         quantity:parseInt(quantityRef.current.value),
    //     }))
    // }
    console.log(singleProduct);
    return (
        <div className="product-info">
            <h1 className="product-title">
                {singleProduct?.name}
            </h1>
            <div className="product-review">
                <ul className="product-star">
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-half"></i></li>
                </ul>
                <span>2 reviews</span>
            </div>
            <div className="product-price">
                <s className="old-price">${originalPrice.toFixed(2)}</s>
                <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
            </div>
            <p className="product-description"
                dangerouslySetInnerHTML={{ __html: singleProduct?.description }}
            >
                {/* {singleProduct?.description} */}

            </p>
            <form className="variations-form">
                <div className="variations">
                    <div className="colors">
                        <div className="colors-label">
                            <span>{`Color-${singleProduct?.colors}`}</span>

                        </div>
                        <div className="colors-wrapper">
                            {
                                singleProduct.colors && singleProduct.colors.map((color, index) => (
                                    <div className={`color-wrapper ${index === 0 ? 'active' : ''}`} key={index}>
                                        <label style={{
                                            backgroundColor: `#${color}`,
                                        }}>
                                            <input type="radio" name="product-color" />
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="values">
                        <div className="values-label">
                            <span>Size</span>
                        </div>
                        <div className="values-list">
                            {singleProduct.size && singleProduct.size.map((sizes, index) => (
                                <span className="active" key={index}>
                                    {sizes.toUpperCase()} 
                                </span>

                            ))}
                        </div>
                    </div>
                    <div className="cart-button">
                        <input ref={quantityRef} 
                        type="number" 
                        defaultValue="1" 
                        min="1" id="quantity" />
                        <button className="btn btn-lg btn-primary" id="add-to-cart" type="button" onClick={() => addToCart({
                            ...singleProduct,
                            price: parseInt(quantityRef.current.value)
                        })}>
                            Add to
                            cart
                            </button>
                    </div>
                    <div className="product-extra-buttons">
                        <a href="#">
                            <i className="bi bi-globe"></i>
                            <span>Size Guide</span>
                        </a>
                        <a href="#">
                            <i className="bi bi-heart"></i>
                            <span>Add to Wislist</span>
                        </a>
                        <a href="#">
                            <i className="bi bi-share"></i>
                            <span>Share this Product</span>
                        </a>
                    </div>
                </div>
            </form>
            <div className="divider"></div>
            <div className="product-meta">
                <div className="product-sku">
                    <span>SKU:</span>
                    <strong>BE45VGRT</strong>
                </div>
                <div className="product-categories">
                    <span>Categories:</span>
                    <strong>Pants , Women</strong>
                </div>
                <div className="product-tags">
                    <span>Tags:</span>
                    <a href="#">black</a>
                    ,
                    <a href="#">white</a>
                </div>
            </div>
        </div>
    )
}

export default Info
