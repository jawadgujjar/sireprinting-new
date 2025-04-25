import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="premium-heading">Welcome to the Future of Packaging</h1>
        <p className="p-tag-landing">
          Unleash your wild ideas with custom printed packaging. Elevate your
          brand with packaging that drives your customers crazy.
        </p>
        <Link to="/get-a-quote">
          <button className="button-landing">Customize Your Design</button>
        </Link>
      </div>
      <img
        className="landing-image"
        src="../images/landing1.png"
        alt="Packaging"
      />
    </div>
  );
};

export default Landing;
