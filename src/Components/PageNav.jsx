import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./PageNav.css";
import cart from "../assets/Icons/cart.svg";
const PageNav = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return (
    <nav className="nav">
      <ul>
      <li>
          <NavLink to="/checkout">
              Elite Sports
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/">
          جميع المنتجات</NavLink>
        </li>
        <li>
          <Link to="/">
            <div className="logo">
              <img src={cart} alt="cart-icon" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
