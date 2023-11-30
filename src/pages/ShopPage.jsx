import React from 'react'
import Categories from '../components/Categories/Categories'
import Products from '../components/Products/Products'
import CampainSigle from '../components/CampainSigle/CampainSigle'

const ShopPage = () => {
  return (
    <React.Fragment>
      <Categories/>
      <Products/>
      <CampainSigle/>
      <Products/>
    </React.Fragment>
  )
}

export default ShopPage
