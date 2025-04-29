import React from "react";
import Subcategory from "../components/products/subcategory";
import Sireadvantage from "../components/landing/sireadvantage";
import Faq1 from "../components/landing/faq";
import Relatedblogs from "../components/productmain/relatedblogs";
import Allproducttxt from "../components/allproducts/allproducttxt";

function Subcategorypage() {
  return (
    <div>
      <Subcategory />
      <Sireadvantage />
      <Faq1 />
      <Allproducttxt/>
    </div>
  );
}

export default Subcategorypage;
