import React from "react";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-inner">
        <div className="banner-image">
          <img
            src="https://s3.amazonaws.com/sireprinting.com/products/1632951680Face-Serum-Boxes-Sire%20Printing%2001.png"
            alt="Packaging Help"
          />
        </div>
        <div className="banner-content">
          <h2 className="banner-title">Request a Sample</h2>
          <p className="banner-text">
            Order a sample of just <strong>1 box</strong>, and we’ll print your
            design and deliver it to your doorstep. Once approved and full order
            placed, <strong>your sample cost is refunded</strong>.
          </p>
          <button className="banner-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
