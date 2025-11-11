import React from "react";
import "./banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-inner">
        <div className="banner-image">
          <img
            src="https://s3.amazonaws.com/sireprinting.com/products/1632951680Face-Serum-Boxes-Sire%20Printing%2001.png"
            alt="Packaging Help"
          />
        </div>
        <div className="banner-content">
          <h2 className="banner-title">Request a Sample</h2>
          <p className="banner-text">
            Want to experience the quality of your custom packaging before
            placing a bulk order? Cheap Custom Packaging makes it easy to
            request a sample of custom boxes with logo, custom shipping boxes,
            or custom printed boxes. Test our premium materials, durable custom
            box packaging in USA, and vibrant designs to see why businesses
            across the U.S. trust us for custom packaging for small business
            needs. Our samples let you feel the texture, check the finishes, and
            review our attention to detail first hand. This ensures every cheap
            custom box you order meets your expectations. From custom boxes
            wholesale to full-service custom packaging solutions, we guarantee
            your satisfaction. Request your sample today, and discover how our
            custom printed boxes, custom box packaging, and professional design
            services can improve your brand. This will impress your customers
            long before your products reach their hands.
          </p>
          <Link to="/sample-product">
            <button className="banner-button">
              Request Your Free Sample Box Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
