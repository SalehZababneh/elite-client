import React, { useEffect, useState } from "react";
import PageNav from "../Components/PageNav";
import "./ProductDetails.css";
import { Link, useParams } from 'react-router-dom';
import "./ProductDetails.css";
const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const[sizes,setSizes]=useState([]);
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const parsedProducts = savedProducts ? JSON.parse(savedProducts) : null;
  
    if (parsedProducts) {
      const foundProduct = parsedProducts.products.find(p => p.id === parseInt(productId));
      setProduct(foundProduct);
      setSizes(foundProduct.sizes)
    }
  }, [productId]);
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const handleQuantityChange = (value) => {
    const newQuantity = selectedQuantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setSelectedQuantity(newQuantity);
      setErrorMessage('');
    } else {
      setErrorMessage('Selected quantity is not available in stock');
    }
  };
  const handleAddToCart = () => {
    console.log(selectedSize,selectedQuantity)
    if (selectedSize && selectedQuantity > 0 && selectedQuantity <= product.stock) {
      const cartItem = {
        productId: product.id,
        size: selectedSize,
        quantity: selectedQuantity,
        name:product.name,
        price:product.price,
        priceAfterCode:product.priceAfterCode,
        image:product.image
      };
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      existingCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(existingCart));
   
    } else {
      setErrorMessage('Please select a valid size and quantity within stock');
    }
  };
  if (!product) {
    return (
      <>
        <PageNav />
        <p>Loading...</p>
      </>
    );
  }
  

  return (
    <>
    <div className="layout">
      <PageNav />
      <div className="product-card">
      {product && (
          <div className="product-images">
            {product.imagePaths.map((imagePath, index) => (
              <img key={index} src={imagePath} alt={`Product ${index + 1}`} className="big-image" />
            ))}
          </div>
        )}
        <div className="product-details">
          <h4 className="name-of-product">{product.name}</h4>
          <p className={`product-price ${product.priceAfterCode} ? underline : ""  `}>السعر: {product.price}</p>
           <p className="product-price-after-code">السعر بعد كود الحسم: {product.price}</p>
          <div className="size-buttons">
          {product.sizes.map((size, index) => (
            <button   className={`button ${selectedSize === size ? 'selected-size' : ''}`} data-text="Awesome"  key={index}
                onClick={() => handleSizeSelect(size)}>
    <span class="actual-text">&nbsp;{size}&nbsp;</span>
    <span aria-hidden="true" class="hover-text">&nbsp;{size}&nbsp;</span>
</button>
            
            ))}
            
          </div>
          <div className="quantity-selector">
         اختر الكمية : 
          <button className="btn-class-name" onClick={() => handleQuantityChange(1)}>
          <span class="back"></span>
         <span class="front">+</span>
          </button>
          <span className="quantity-span">{selectedQuantity}</span>
          <button className="btn-class-name" onClick={() => handleQuantityChange(-1)}>
          <span class="back"></span>
         <span class="front">-</span>
          </button>
         
          
          </div>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
      </div>
      <div className="go-to-checkout">
     
        <button className="add-to-cart-button" onClick={handleAddToCart}>
  <span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
  اضافة الى السلة
  </span>
</button>
        <Link to="/checkout"><button className="check-btn">اذهب الى المشتريات</button></Link>
      </div>
      </div>
      </>
      
  );
};

export default ProductDetails;
