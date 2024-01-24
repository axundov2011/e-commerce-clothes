import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import AuthenticationPage from './pages/AuthenticationPage'
import BlogDetailsPage from './pages/BlogDetailsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import './App.css'
import React from "react"
import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/admin/UserPage"
import CategoryPage from "./pages/admin/Categories/CategoryPage"
import UpdateCaregoryPage from "./pages/admin/Categories/UpdateCaregoryPage"
import CreateCategoryPage from "./pages/admin/Categories/CreateCategoryPage"
import CreateProductPage from "./pages/admin/Products/CreateProductPage"
import ProductPage from "./pages/admin/Products/ProductPage"
import UpdateProductPage from "./pages/admin/Products/UpdateProductPage"
import CouponPage from "./pages/admin/Coupons/CouponPage"
import CreateCouponPage from "./pages/admin/Coupons/CreateCouponPage"
import UpdateCouponPage from "./pages/admin/Coupons/UpdateCouponPage"


function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />}/>
        
        <Route path="/admin/*">
        <Route path="users" element={<UserPage/>}/>

        <Route path="categories" element={<CategoryPage/>}/>
        <Route path="categories/create" element={<CreateCategoryPage/>}/>
        <Route path="categories/update/:id" element={<UpdateCaregoryPage/>}/>

        <Route path="products" element={<ProductPage/>}/>
        <Route path="products/create"  element={<CreateProductPage/>}  />
        <Route path="products/update/:id" element={<UpdateProductPage/>}/>

        <Route path="coupons" element={<CouponPage/>}/>
        <Route path="coupons/create"  element={<CreateCouponPage/>}  />
        <Route path="coupons/update/:id" element={<UpdateCouponPage/>}/>


        
        </Route>
        
    
      </Routes>

</React.Fragment>
  )
}

export default App
