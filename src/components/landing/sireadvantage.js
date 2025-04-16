import React from "react";
import "./sireadvantage.css";
import { FaBox, FaPaintBrush, FaTruck } from "react-icons/fa";

function Sireadvantage() {
  return (
    <div className="sireadvantage-wrapper">
      <hr className="divider-line" />
      <h2 className="advantage-main">SIRE PRINTING ADVANTAGES</h2>

      <div className="three-images-advantages">
        <div className="advantage-card">
          <img
            alt="advantage-sustainable"
            src="https://res.cloudinary.com/sireprinting/image/upload/v1600727486/Self%20Lock%20Cake%20Boxes.jpg"
          />
          <h3>Sustainable Material</h3>
        </div>
        <div className="advantage-card">
          <img
            alt="advantage-eco"
            src="https://res.cloudinary.com/sireprinting/image/upload/v1600727486/Self%20Lock%20Cake%20Boxes.jpg"
          />
          <h3>Eco-Friendly Packaging</h3>
        </div>
        <div className="advantage-card">
          <img
            alt="advantage-recyclable"
            src="https://res.cloudinary.com/sireprinting/image/upload/v1600727486/Self%20Lock%20Cake%20Boxes.jpg"
          />
          <h3>Recyclable Boxes</h3>
        </div>
      </div>

      <div className="how-it-works-section">
        <h3 className="how-it-works-title">How It Works</h3>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">
              <FaBox />
            </div>
            <h4>Select the Box Type</h4>
            <p>
              Choose from one of our twelve standard sizes to create a custom
              packaging that fits your product perfectly.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <FaPaintBrush />
            </div>
            <h4>Create your Design</h4>
            <p>
              Upload existing artwork or use our 3D Design Studio to make
              packaging that stands out.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <FaTruck />
            </div>
            <h4>Get Your Custom Boxes</h4>
            <p>
              After proof approval, your custom printed boxes are shipped within
              7-10 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sireadvantage;
