import React from "react";
import Allproduct1 from "../components/allproducts/allproduct";
import Videocarousel from "../components/landing/carouselvideo";
import Allproducttxt from "../components/allproducts/allproducttxt";
import Testimonial from "../components/landing/testimonial";
import Categorydescription from "../components/products/catdes";
import Benefits from "../components/products/benefits";
import Banner from "../components/landing/banner";
import Faq1 from "../components/landing/faq";

function Allproductpage() {
  return (
    <div>
      {/* <Allproduct1/>
      <Videocarousel />
      <Allproducttxt/>
      <Testimonial /> */}

      <Allproduct1 />
      <Categorydescription />
      <Benefits />
      <Banner />
      <Faq1 />
    </div>
  );
}

export default Allproductpage;
