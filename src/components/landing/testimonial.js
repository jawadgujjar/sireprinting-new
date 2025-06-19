import React, { useEffect } from "react";
import "./testimonial.css";

const Testimonial = () => {
  useEffect(() => {
    // Load Featurable script
    const script = document.createElement("script");
    script.src = "https://featurable.com/assets/bundle.js";
    script.defer = true;
    script.charset = "UTF-8";
    document.body.appendChild(script);

    // Remove branding repeatedly
    const removeBranding = () => {
      const brandingEls = document.querySelectorAll(
        '.powered-by-featurable, [href*="featurable"], .Branding-module__inline--DrMTH'
      );
      brandingEls.forEach((el) => {
        el.style.display = "none";
        el.remove();
      });
    };

    // Run initially after a small delay
    setTimeout(removeBranding, 2000);

    // Keep checking using interval (in case it's loaded later)
    const interval = setInterval(() => {
      removeBranding();
    }, 1500);

    // Also observe for changes in DOM
    const observer = new MutationObserver(removeBranding);
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => {
      document.body.removeChild(script);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="testimonial-main">
      <div className="testimonial-header">
        <h2 className="trustedtext">Customer Testimonials</h2>
        <p className="industry-main-p">
          See what our clients say about our packaging solutions
        </p>
      </div>

      <div
        style={{
          maxHeight: "100px",
          height: "100px",
          overflow: "hidden",
          position: "relative",
        }}
        id="featurable-d4ac21d0-a964-4f3c-8665-528e6b784256"
        data-featurable-async
        className="featurable-widget-container"
      ></div>
    </div>
  );
};

export default Testimonial;
