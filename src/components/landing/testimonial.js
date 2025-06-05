import React, { useEffect } from "react";
import "./testimonial.css";

const Testimonial = () => {
  useEffect(() => {
    // Load script and add mutation observer to remove branding
    const script = document.createElement("script");
    script.src = "https://featurable.com/assets/bundle.js";
    script.defer = true;
    script.charset = "UTF-8";
    document.body.appendChild(script);

    // Observer to remove branding as soon as it appears
    const observer = new MutationObserver((mutations) => {
      const branding = document.querySelector(
        '.powered-by-featurable, [href*="featurable"]'
      );
      if (branding) {
        branding.remove();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.body.removeChild(script);
      observer.disconnect();
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
        id="featurable-d4ac21d0-a964-4f3c-8665-528e6b784256"
        data-featurable-async
        className="featurable-widget-container"
      >
        <div className="widget-loading">Loading reviews...</div>
      </div>
    </div>
  );
};

export default Testimonial;
