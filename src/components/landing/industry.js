import React from "react";
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

const Industry = () => {
  return (
    <div className="trusted">
      <h2 className="industry-main">Boxes By Style</h2>
      <p className="industry-main-p">
        Discover customized packaging designed exclusively for your industry.
        Our expert team creates innovative solutions that not only meet but
        exceed your packaging needs.
      </p>

      <div className="industry-grid">
        {logos.map((item, index) => (
          <div key={index} className="industry-card">
            {" "}
            {/* ← yeh change karo */}
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="product-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industry;
