import React from "react";
import Subcategory from "../components/products/subcategory";
import Sireadvantage from "../components/landing/sireadvantage";
import Faq1 from "../components/landing/faq";
import Allproducttxt from "../components/allproducts/allproducttxt";
import Subcategoryhead from "../components/products/subcategoryhead";

function Subcategorypage() {
  return (
    <div>
      <Subcategoryhead />
      <Subcategory />
      <Sireadvantage />
      <Faq1 />
      <Allproducttxt />
    </div>
  );
}

export default Subcategorypage;
