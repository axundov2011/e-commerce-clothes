import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css"
import { logout, selecthAuth } from "../../../redux/slices/auth.slice";
const Header = ({ setIsSearchShow }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const isAuth = useSelector(selecthAuth)
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cart)

    //logout
    // const restLogOut = () =>{
    //     if(window.confirm("Siz heqiqeten silmek istediyinizden eminsiniz ?") && !isLoggingOut){
    //         setIsLoggingOut(true);
    //         dispatch(logout());

    //         setTimeout(() => {
    //             localStorage.removeItem('token');
    //             setIsLoggingOut(false);
    //             navigate("/auth")
    //         })
    //     }
    // }

    const user = localStorage.getItem("userToken")


    return (
        <div>
            <header>
                <div className="global-notification">
                    <div className="container">
                        <p>
                            SUMMER SALE FOR ALL SWIM SUITS AND FREE EXPRESS INTERNATIONAL DELIVERY
                            - OFF 50%!
                            <a href="shop.html">SHOP NOW</a>
                        </p>
                    </div>
                </div>
                <div className="header-row">
                    <div className="container">
                        <div className="header-wrapper">
                            <div className="header-mobile">
                                <i className="bi bi-list" id="btn-menu"></i>
                            </div>
                            <div className="header-left">
                                <Link to="/" className="logo">LOGO</Link>
                            </div>
                            <div className="header-center" id="sidebar">
                                <nav className="navigation">
                                    <ul className="menu-list">
                                        <li className="menu-list-item">
                                            <Link to="/" className={`menu-link ${pathname === "/" && 'active'}`}>
                                                Home
                                                <i className="bi bi-chevron-down"></i>
                                            </Link>
                                            <div className="menu-dropdown-wrapper">
                                                <ul className="menu-dropdown-content">
                                                    <li>
                                                        <Link href="#">Home Clean</Link>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home Collection</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home Minimal</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home Modern</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home Parallax</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home Strong</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home Style</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home Unique</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Home RTL</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="menu-list-item megamenu-wrapper">
                                            <Link to="/shop" className={`menu-link ${pathname === "/shop" && 'active'}`}>
                                                Shop
                                                <i className="bi bi-chevron-down"></i>
                                            </Link>
                                            <div className="menu-dropdown-wrapper">
                                                <div className="menu-dropdown-megamenu">
                                                    <div className="megamenu-links">
                                                        <div className="megamenu-products">
                                                            <h3 className="megamenu-products-title">
                                                                Shop Style
                                                            </h3>
                                                            <ul className="megamenu-menu-list">
                                                                <li>
                                                                    <a href="#">Shop Standard</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Shop Full</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Shop Only Categories</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Shop Image Categories</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Shop Sub Categories</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Shop List</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Hover Style 1</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Hover Style 2</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Hover Style 3</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="megamenu-products">
                                                            <h3 className="megamenu-products-title">
                                                                Filter Layout
                                                            </h3>
                                                            <ul className="megamenu-menu-list">
                                                                <li>
                                                                    <a href="#">Sidebar</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Filter Side Out</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Filter Dropdown</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Filter Drawer</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="megamenu-products">
                                                            <h3 className="megamenu-products-title">
                                                                Shop Loader
                                                            </h3>
                                                            <ul className="megamenu-menu-list">
                                                                <li>
                                                                    <a href="#">Shop Pagination</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Shop Infinity</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Shop Load More</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Cart Modal</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Cart Drawer</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Cart Page</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="megamenu-single">
                                                        <a href="#">
                                                            <img src="/img/mega-menu.jpg" alt="" />
                                                        </a>
                                                        <h3 className="megamenu-single-title">JOIN THE LAYERING GANG</h3>
                                                        <h4 className="megamenu-single-subtitle">Suspendisse faucibus nunc et
                                                            pellentesque</h4>
                                                        <a href="#" className="megamenu-single-button btn btn-sm">Shop Now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="menu-list-item">
                                            <Link to="/blog" className={`menu-link ${pathname === "/blog" && 'active'}`}>
                                                Blog
                                            </Link>
                                        </li>
                                        <li className="menu-list-item">
                                            <Link to="/contact" className={`menu-link ${pathname === "/contact" && 'active'}`}>
                                                Contact
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                                <i className="bi-x-circle" id="close-sidebar"></i>
                            </div>
                            <div className="header-right">
                                <div className="header-right-links">
                                    {isAuth && isAuth ?(
                                        <Link to="/update" className="header-account">
                                        <i className="bi bi-person"></i>
                                    </Link>
                                    ) : <Link to="/auth" className="header-account">
                                    <i className="bi bi-person"></i>
                                </Link>}
                                    <button className="search-button" onClick={() => setIsSearchShow(true)}>
                                        <i className="bi bi-search"></i>
                                    </button>
                                    {/* <a href="#">
                                        <i className="bi bi-heart"></i>
                                    </a> */}
                                    <div className="header-cart">
                                        <Link to="/cart" className="header-cart-link">
                                            <i className="bi bi-bag"></i>
                                            <span className="header-cart-count">{cartItems?.length}</span>
                                        </Link>
                                    </div>
                                    {user && (
                                        <button className="search-button" onClick={() => setIsSearchShow(true)}>
                                            <i className="bi bi-box-arrow-right" onClick={() => {
                                                if (window.confirm('Siz heqiqeten silmek istediyinizden eminsiniz ?')) {
                                                    localStorage.removeItem("userToken")
                                                    window.location.href = "/"
                                                }
                                            }}></i>
                                        </button>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>    </div>
    )
}

export default Header



//Odev: Eger giris yapildiysa burayi gosterme, sadece user alani goster yani emailin sifresini falan degistirecek bir alan olsun