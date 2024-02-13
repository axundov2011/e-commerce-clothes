import React, { useEffect } from "react";
import Sliders from "../components/Slider/Sliders";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaings/Campaings";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampainSigle/CampainSigle";
import { useDispatch } from "react-redux";
import { setCartItems } from "../redux/slices/Cart.slice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(setCartItems([]))
  },[dispatch])
  return (
    <React.Fragment>
      <Sliders />
      <Categories />
      <Products />
      <Campaigns />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;