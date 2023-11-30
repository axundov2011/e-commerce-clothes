import BrandItem from "./BrandItem"
import "./Brands.css"
const Brands = () => {
  return (
    <div>
        <section className="brands">
    <div className="container">
      <ul className="brand-list">
     <BrandItem/>
     <BrandItem/>
     <BrandItem/>
      </ul>
    </div>
  </section>
    </div>
  )
}

export default Brands
