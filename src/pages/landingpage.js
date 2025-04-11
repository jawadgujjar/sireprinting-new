import React from "react";
import LandingPage from "../components/landing/landing";
import Videocarousel from "../components/landing/carouselvideo";
import Brands from "../components/landing/brands";
import Popularproducts from "../components/landing/popularproducts";
import Solutions from "../components/landing/solutions";
import Faq1 from "../components/landing/faq";
import Testimonial from "../components/landing/testimonial";

function Landingpage() {
  return (
    <div>
      <LandingPage />
      <Brands />
      <Videocarousel />
      <Popularproducts />
      <Solutions />
      <Faq1 />
      <Testimonial />
    </div>
  );
}

export default Landingpage;
