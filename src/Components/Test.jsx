// import React, { useEffect, useState } from "react";
// import PageNav from "../Components/PageNav";
// import "./ProductDetails.css";
// // import DetailsProduct from '../Components/DetailsProduct'
// import { useParams } from 'react-router-dom';

// const ProductDetails = () => {
//   const { productId } = useParams(); 
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await fetch(`http://192.168.1.135:8000/api/getAllProducts`);
//         if (response.ok) {
//           const data = await response.json();
//           const foundProduct = data.products.find(p => p.id === parseInt(productId));
//           if (foundProduct) {
//             const {
//               id,
//               name,
//               gender,
//               category,
//               color,
//               sizes,
//               stock,
//               price,
//               priceAfterCode,
//               sizeGuide,
//               created_at,
//               updated_at,
//               image,
//             } = foundProduct;
//             setProduct(foundProduct);
//             console.log(foundProduct,'1')
//           } else {
//             console.error('Product not found');
//           }
//         } else {
//           console.error('Failed to fetch product details');
//         }
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };

//     fetchProductDetails();
    
//   }, [productId]); 
//  const selectedOptions={}
// //  const handleAddToCart = (productId, selectedOptions) => {
// //   let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
// //   const productToAdd = {
// //     id: productId, // Use productId obtained from URL params
// //     selectedOptions,
// //   };
// //   cartItems.push(productToAdd);
// //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
// // };
 
//   // const [selectedImage, setSelectedImage] = useState(product.images[0]);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   // const handleImageClick = (image) => {
//   //   setSelectedImage(image);
//   // };
// console.log(product)
//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//   };

//   const incrementQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
//   return (

//     );
// };

// export default ProductDetails;
