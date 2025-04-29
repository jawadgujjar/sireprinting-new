import React from "react";
import { FaHeadset, FaPencilRuler, FaTruck, FaShieldAlt } from "react-icons/fa";
import "./benefits.css";

function Benefits() {
  const benefits = [
    {
      id: 1,
      icon: <FaHeadset className="benefit-icon" />,
      title: "Free Consultancy",
      description:
        "Expert guidance to help you choose the perfect packaging solution",
    },
    {
      id: 2,
      icon: <FaPencilRuler className="benefit-icon" />,
      title: "Design Support",
      description: "Professional design assistance for your custom packaging",
    },
    {
      id: 3,
      icon: <FaTruck className="benefit-icon" />,
      title: "Doorstep Shipping",
      description: "Reliable delivery right to your location nationwide",
    },
    {
      id: 4,
      icon: <FaShieldAlt className="benefit-icon" />,
      title: "Quality Assurance",
      description: "Premium materials and rigorous quality checks",
    },
  ];

  return (
    <div className="benefits-container">
      <div className="benefits-heading">
        <h1>Custom Packaging That Comes with Benefits</h1>
        <h3>
          Offering our valued customers more with Free Consultancy, Design
          Support, Doorstep Shipping, & Many More.
        </h3>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="benefit-card">
            <div className="benefit-icon-container">{benefit.icon}</div>
            <h3 className="benefit-title">{benefit.title}</h3>
            <p className="benefit-description">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Benefits;
