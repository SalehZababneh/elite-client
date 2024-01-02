import React from "react";
import Intro from "../Components/Intro";
import PageNav from "../Components/PageNav";
import Products from "../Components/Products";
const Home = ({ products }) => {
  return (
    <>
      <PageNav />
        <Intro />
        <Products products={products}/>
      
    </>
  );
};

export default Home;
