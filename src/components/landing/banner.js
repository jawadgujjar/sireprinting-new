import React from "react";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-content">
        <h2 className="banner-title">Need Help? Call Our Team At</h2>
        <p className="banner-phone">(302) 778-9458</p>
        <h3 className="banner-subtitle">
          Need Help with Sire Printing Packaging Consultant?
        </h3>
        <p className="banner-text">
          We're here! We offer a variety of packaging options, from sustainable
          choices to personalized packaging, all aimed at helping your product
          stand out. And with our fast turnaround, you can get started without
          the wait.
        </p>

        <button className="banner-button">ASK FOR HELP</button>
      </div>
    </div>
  );
};

export default Banner;
