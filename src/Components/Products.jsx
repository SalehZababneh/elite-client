import React from "react";
import ProductCard from "./ProductCard";
import "./products.css";
import { Link } from "react-router-dom";
const Products =(({ products }) => {
  const handleProductClick = (productId) => {
   
  };
  console.log(products)
  console.log("p")

  return (
    <div className="all-products">
      {products.map((product) => (
        
        <Link key={product.id} to={`/product-details/${product.id}`}>
          <ProductCard products={product} /> 
        </Link> 
      ))} 
    </div>
  );
});

export default Products;
