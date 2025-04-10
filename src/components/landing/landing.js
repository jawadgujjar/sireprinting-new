import React from "react";
import "./landing.css";
import { Button } from "antd";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to the Future of Packaging</h1>
        <p>
          Unleash your wild ideas with custom printed packaging. Elevate your
          brand with packaging that drives your customers crazy.
        </p>
        <button className="button-landing">Customize Your Design</button>
      </div>
    </div>
  );
};

export default LandingPage;
