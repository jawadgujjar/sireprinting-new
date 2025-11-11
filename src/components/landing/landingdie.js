import React from "react";
import { Link } from "react-router-dom";
import "./landingdie.css";

function Landingdie() {
  const cardData = [
    {
      image: "/images/can't find.png",
      title: "CAN’T FIND A SIZE YOU NEED?",
      description:
        "No worries! We customize packaging to fit your exact product dimensions. Just share the length, width, and height (L×W×D) of your item, and we’ll create the perfect custom-sized box tailored just for you.",
      link: "/get-a-quote",
      button: "Talk to Our Design Expert Now",
    },
    {
      image: "/images/Request_Template-01.png",
      title: "Request Box Template",
      description:
        "Need a specific box template? We’ve got you covered. Provide your product’s dimensions (L×W×D), and we’ll design a custom packaging template that fits your needs perfectly—making your packaging process easier and faster.",
      link: "/Die-template",
      button: "Get Free Template",
    },
  ];

  return (
    <div className="landingdie-container">
      {cardData.map((card, index) => (
        <div key={index} className="landingdie-card">
          <img src={card.image} alt={card.image} className="landingdie-image" />
          <h2 className="landingdie-title">{card.title}</h2>
          <p className="landingdie-description">{card.description}</p>

          <Link to={card.link} className="landingdie-button-link">
            <button className="landingdie-button">{card.button}</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Landingdie;
