import React from "react";
import LandingPage from "../components/landing/landing";
import Videocarousel from "../components/landing/carouselvideo";
import Brands from "../components/landing/brands";
import Popularproducts from "../components/landing/popularproducts";

function Landingpage() {
  return (
    <div>
      <LandingPage />
      <Brands />
      <Videocarousel />
      <Popularproducts />
    </div>
  );
}

export default Landingpage;
