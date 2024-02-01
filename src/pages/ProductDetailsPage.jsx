
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductDetails from "../components/ProductDetails/ProductDetails"
import { Form, useParams } from "react-router-dom";
import { useState } from "react";
import { fetchProducts, fetchSingleProducts } from "../redux/slices/product.slice";
const ProductDetailsPage = () => {
  const [singleProduct, setSignleProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  useEffect(() => {
    const fethcSignlePraduct = async () => {
      setLoading(true);
      try {
        const response = await dispatch(fetchSingleProducts(productId));
        if (!response.payload) {
          throw new Error("Dataları getirme xətası")
        }
        const data = response.payload;
        if (data) {
          setSignleProduct(data);
        }

      } catch (error) {
          throw error
      } 
    };
    fethcSignlePraduct();
  }, [productId, dispatch])

  return singleProduct ? (<ProductDetails singleProduct={singleProduct} setSignleProduct={setSignleProduct} />)
   : ("Ürün yükleniyor")
}

export default ProductDetailsPage
