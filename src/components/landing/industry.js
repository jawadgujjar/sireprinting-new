import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook for navigation
import "./industry.css";

const logos = [
  {
    title: "Custom Packaging Box",
    description: "High-quality packaging for your business.",
    image: "../images/arka.png",
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    image: "../images/arka.png",
  },
  {
    title: "Rigid Boxes",
    description: "Sturdy and stylish boxes for luxury goods.",
    image: "../images/arka.png",
  },
  {
    title: "Mailer Boxes",
    description: "Perfect for shipping and branding.",
    image: "../images/arka.png",
  },
  {
    title: "Corrugated Boxes",
    description: "Durable and versatile for all industries.",
    image: "../images/arka.png",
  },
  {
    title: "Display Boxes",
    description: "Showcase your product in style.",
    image: "../images/arka.png",
  },
  {
    title: "Subscription Boxes",
    description: "Tailored for monthly delights.",
    image: "../images/arka.png",
  },
  {
    title: "Eco-Friendly Boxes",
    description: "Sustainable and biodegradable packaging.",
    image: "../images/arka.png",
  },
];

const customBoxes = [
  {
    title: "Custom Box 1",
    description: "Bespoke designs for your products.",
    image: "../images/arka.png",
  },
  {
    title: "Custom Box 2",
    description: "Perfect fit for your brand's needs.",
    image: "../images/arka.png",
  },
  {
    title: "Custom Box 3",
    description: "High-end materials for luxury packaging.",
    image: "../images/arka.png",
  },
  {
    title: "Custom Box 4",
    description: "Innovative design to stand out.",
    image: "../images/arka.png",
  },
  {
    title: "Custom Box 5",
    description: "Custom-tailored for your products.",
    image: "../images/arka.png",
  },
  {
    title: "Custom Box 6",
    description: "Elegant and sleek packaging solutions.",
    image: "../images/arka.png",
  },
  {
    title: "Custom Box 7",
    description: "Environmentally friendly options.",
    image: "../images/arka.png",
  },
  {
    title: "Custom Box 8",
    description: "Perfect for gifting and branding.",
    image: "../images/arka.png",
  },
];

const Industry = () => {
  const [activeTab, setActiveTab] = useState("customBoxes");
  const navigate = useNavigate();

  const renderContent = () => {
    const items =
      activeTab === "boxesByStyle" ? logos : customBoxes.slice(0, 8);

    return items.map((item, index) => (
      <div key={index} className="industry-card">
        <img src={item.image} alt={item.title} />
        <div className="industry-blue-part">
          <h3>{item.title}</h3>
          <p className="product-desc">{item.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="trusted">
      <div className="div-trustedtext">
        <h2 className="trustedtext">Packaging Solutions</h2>
      </div>
      <p className="industry-main-p">
        Discover customized packaging designed exclusively for your industry.
        Our expert team creates innovative solutions that not only meet but
        exceed your packaging needs.
      </p>

      <div className="tabs">
        <button
          className={`tab-button ${
            activeTab === "customBoxes" ? "active" : ""
          }`}
          onClick={() => setActiveTab("customBoxes")}
        >
          Custom Boxes
        </button>
        <button
          className={`tab-button ${
            activeTab === "boxesByStyle" ? "active" : ""
          }`}
          onClick={() => setActiveTab("boxesByStyle")}
        >
          Boxes By Style
        </button>
      </div>

      <div className="industry-grid">{renderContent()}</div>

      <button
        className="show-more-btn"
        onClick={() => navigate("/allproducts")} // Navigate to /allproducts
      >
        Show More
      </button>
    </div>
  );
};

export default Industry;
