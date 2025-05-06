import React from "react";
import "./landingquote.css";
import { Link } from "react-router-dom";

function Landingquote() {
  return (
    <div className="landingquote-container">
      <div className="landingquote-text">
        <h2>Looking for other custom boxes and packaging?</h2>
        <p>
          Chat live with our packaging experts now for a free consultation and
          instant price quote.
        </p>
      </div>
      <div className="landingquote-button">
        <Link to="/get-a-quote">
          <button>Contact Us</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingquote;
