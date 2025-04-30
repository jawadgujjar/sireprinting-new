import React from "react";
import Subcategory from "../components/products/subcategory";
import Sireadvantage from "../components/landing/sireadvantage";
import Faq1 from "../components/landing/faq";
import Subcategoryhead from "../components/products/subcategoryhead";
import Categorydescription from "../components/products/catdes";
import Banner from "../components/landing/banner";

function Subcategorypage() {
  return (
    <div>
      <Subcategoryhead />
      <Subcategory />
      <Sireadvantage />
      <Banner />
      <Categorydescription/>
      <Faq1 />
     
    </div>
  );
}

export default Subcategorypage;
