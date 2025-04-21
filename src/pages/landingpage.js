import React from "react";
import LandingPage from "../components/landing/landing";
import Videocarousel from "../components/landing/carouselvideo";
import Brands from "../components/landing/brands";
import Popularproducts from "../components/landing/popularproducts";
import Solutions from "../components/landing/solutions";
import Faq1 from "../components/landing/faq";
import Testimonial from "../components/landing/testimonial";
import Industry from "../components/landing/industry";
import Sireadvantage from "../components/landing/sireadvantage";

function Landingpage() {
  return (
    <div>
      <LandingPage />
      <Brands />
      <Industry />
      <Popularproducts />
      <Solutions />
      <Sireadvantage />
      <Videocarousel />
      <Testimonial />
      <Faq1 />
    </div>
  );
}

export default Landingpage;
