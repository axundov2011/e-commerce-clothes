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
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
      </Routes>

</React.Fragment>
  )
}

export default App
