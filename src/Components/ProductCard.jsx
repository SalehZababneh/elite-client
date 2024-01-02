import React from "react";
import "./ProductCard.css";
import Product from "../assets/Photos/Product.jpg";
import { Link } from "react-router-dom";
const ProductCard = ({products}) => {
  console.log(products)
  const firstImage = products.imagePaths[0];
  console.log(products.imagePaths)
  console.log(`${products.imagePaths}`)
  const img = `${products.imagePaths}`
  console.log(img)
   return (
    
      <div className="product-card-container">
        <div className="product-photo">
          <img src={firstImage} alt="x"/>
            </div>

        <div className="product-card-detail">
          <p className="product-card-category">{products.category}</p>
          <p className="product-card-name">{products.name}</p>
          <p className="product-card-price">{products.price}</p>
          <div className="product-card-priceAfterCode">
            <span className="product-card-priceAfterCode-span">السعر بعد الخصم</span>
            <span>{products.priceAfterCode}</span>
          </div>
        </div>
      </div>
    
  );
};

export default ProductCard;
