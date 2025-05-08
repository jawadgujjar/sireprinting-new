import React from 'react';
import { Link } from 'react-router-dom';
import './landingdie.css';

function Landingdie() {
  const cardData = [
    {
      image: '/images/1.webp',
      title: "CAN’T FIND A SIZE YOU NEED?",
      description: "No worries, we can customize packaging according to your needs, just give us the right dimensions (LXWXD) of your product, and we will make a custom size for you!",
      link: "/get-a-quote"
    },
    {
      image: '/images/1.webp',
      title: "CAN’T FIND A SIZE YOU NEED?",
      description: "No worries, we can customize packaging according to your needs, just give us the right dimensions (LXWXD) of your product, and we will make a custom size for you!",
      link: "/Die-template"
    }
  ];

  return (
    <div className="landingdie-container">
      {cardData.map((card, index) => (
        <div key={index} className="landingdie-card">
          <img src={card.image} alt="Custom Box" className="landingdie-image" />
          <h2 className="landingdie-title">{card.title}</h2>
          <p className="landingdie-description">{card.description}</p>
          
          <Link to={card.link} className="landingdie-button-link">
            <button className="landingdie-button">Get Started</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Landingdie;
