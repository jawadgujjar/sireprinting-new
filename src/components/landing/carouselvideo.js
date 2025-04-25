import React, { useEffect } from "react";
import "./carouselvideo.css";

function Videocarousel() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <style>
        {`
          .elfsight-app [class*="elfsight-app-"] > div > div:last-child {
            display: none !important;
          }
        `}
      </style>

      <div className="carousel-main">
        <div className="div-trustedtext">
          <h2 className="trustedtext">Get Inspiration</h2>
        </div>
        <hr />
      </div>

      <div
        className="elfsight-app-71a478a1-87ec-4fad-9a55-38a7214d4bca"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
}

export default Videocarousel;
