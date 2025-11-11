import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="premium-heading">
          Custom Packaging Boxes Made for Your Brand in the USA
        </h1>
        <p className="p-tag-landing">
          Bring your brand to life with custom packaging boxes designed to
          impress. From custom boxes with logo to cheap custom boxes, we craft
          packaging that protects, promotes, and elevates your products. Perfect
          for small businesses and large enterprises alike.
        </p>
        <Link to="/get-a-quote">
          <button className="button-landing">Get a Free Custom Design</button>
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
