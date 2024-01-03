import Navbar from "./Navbar";
// import REACT_APP_API_URL from "./.env.production"

import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import PageNav from "./Components/PageNav";


function App() {
  // const [cartItems, setCartItems] = useState([]);
  // const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  // const addToCart = (product) => {
  //   setCartItems([...cartItems, product]);
  // };
  // const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getAllProducts`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
  
          localStorage.setItem('products', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts(); // Call fetchProducts only once, remove the extra call
  
  }, []);
console.log(products)
  return (
    <>
    
      {/* <PageNav cartItems={cartItems}/> */}
      <BrowserRouter basename='/' >
        <Routes>
           <Route path="/" element={<Home products={products} />} />
           <Route path="product-details/:productId" element={<ProductDetails />} />
           <Route path="products" element={<ProductDetails  />} /> 
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
