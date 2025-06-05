import React, { useState } from "react";
import "./carouselvideo.css";

function Videocarousel() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "425px",
          overflow: "hidden",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        {isLoading && (
          <div className="loader-container">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="loading-image"
            />
            <div className="loader"></div>
          </div>
        )}

        <div className="div-trustedtext">
          <h2 className="trustedtext">Get Inspiration</h2>
        </div>

        <iframe
          src="https://widget.tagembed.com/embed/12345?view" // Replace with your actual Tagembed iframe src
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "12px",
          }}
          title="Instagram Feed"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  );
}

export default Videocarousel;
