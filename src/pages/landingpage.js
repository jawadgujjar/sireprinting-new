import React from "react";
import LandingPage from "../components/landing/landing";
import Videocarousel from "../components/landing/carouselvideo";
import Brands from "../components/landing/brands";
import Faq1 from "../components/landing/faq";
import Testimonial from "../components/landing/testimonial";
import Industry from "../components/landing/industry";
import Sireadvantage from "../components/landing/sireadvantage";
import Banner from "../components/landing/banner";
import Landingdes from "../components/landing/landingdes";
// import Landingquote from "../components/landing/landingquote";
import Landingdie from "../components/landing/landingdie";
import Sireadvantageorder from "../components/landing/sireadvantageorder";

function Landingpage() {
  return (
    <div>
      <LandingPage />
      <Brands />
      <Industry />
      {/* <Popularproducts /> */}
      {/* <Solutions /> */}
      <Sireadvantage />
      {/* <Landingquote /> */}
      <Landingdes />
      <Landingdie />
      <Sireadvantageorder />
      <Banner />
      <Videocarousel />
      <Testimonial />
      <Faq1 />
    </div>
  );
}

export default Landingpage;
