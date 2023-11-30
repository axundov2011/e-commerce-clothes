import Bredcrumb from "./Bredcrumb/Bredcrumb"
import Galery from "./Galery/Galery"
import Info from "./Info/Info"
import "./ProductDetails.css"
import Tabs from "./Tabs/Tabs"
const ProductDetails = () => {
    return (
        <div>
            <section className="single-product">
                <div className="container">
                    <div className="single-product-wrapper">

                        <Bredcrumb />

                        <div className="single-content">
                            <main className="site-main">
                                <Galery />
                                <Info />
                            </main>
                        </div>
                        <Tabs />
                    </div>
                </div>
            </section>    </div>
    )
}

export default ProductDetails
