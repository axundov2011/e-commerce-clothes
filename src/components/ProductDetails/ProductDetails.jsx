import Bredcrumb from "./Bredcrumb/Bredcrumb"
import Gallery from "./Galery/Galery"
import Info from "./Info/Info"
import "./ProductDetails.css"
import Tabs from "./Tabs/Tabs"
const ProductDetails = ({singleProduct, setSignleProduct}) => {
    return (
        <div>
            <section className="single-product">
                <div className="container">
                    <div className="single-product-wrapper">

                        <Bredcrumb />

                        <div className="single-content">
                            <main className="site-main">
                                <Gallery  singleProduct={singleProduct}/>
                                <Info singleProduct={singleProduct} />
                            </main>
                        </div>
                        <Tabs singleProduct={singleProduct} setSignleProduct={setSignleProduct} />
                    </div>
                </div>
            </section>    </div>
    )
}

export default ProductDetails
