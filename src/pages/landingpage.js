import React from "react";
import LandingPage from "../components/landing/landing";
import Videocarousel from "../components/landing/carouselvideo";
import Brands from "../components/landing/brands";

function Landingpage() {
  return (
    <div>
      <LandingPage />
      <Brands />
      <Videocarousel />
    </div>
  );
}

export default Landingpage;
