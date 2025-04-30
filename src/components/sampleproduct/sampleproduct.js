import React from "react";
import "./sampleproduct.css";
import { Button } from "antd";

function SampleProduct() {
  return (
    <div className="sample-product-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-heading">Packaging Samples</h1>
        <p className="hero-text">
          Experience the packaging that meets your requirements and products,
          allowing you to place larger orders with confidence.
        </p>
      </div>

      {/* Samples Section */}
      <div className="samples-section">
        <h2 className="samples-heading">Samples</h2>

        <div className="cards-container">
          {/* Card 1 */}
          <div className="product-card">
            <img
              src="https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/random-sample.png"
              alt="Random Sample"
              className="card-image"
            />
            <div className="card-content">
              <h3 className="card-title">Random Sample</h3>
              <p className="card-text">
                These are random samples that we provide you from our recently
                manufactured boxes.
              </p>
              <Button type="primary" className="price-button">
                $40
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="product-card">
            <img
              src="https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/plain-sample.png"
              alt="Custom Sample"
              className="card-image"
            />
            <div className="card-content">
              <h3 className="card-title">Custom Sample</h3>
              <p className="card-text">
                Customized samples made according to your specific requirements
                and designs.
              </p>
              <Button type="primary" className="price-button">
                $100
              </Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="product-card">
            <img
              src="https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/pre-production-sample.png"
              alt="Premium Sample"
              className="card-image"
            />
            <div className="card-content">
              <h3 className="card-title">Premium Sample</h3>
              <p className="card-text">
                High-quality samples showcasing our premium materials and
                finishing options.
              </p>
              <Button type="primary" className="price-button">
                Get Price
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Packaging Section */}
      <div className="hero-section">
        <h1 className="hero-heading" style={{ marginTop: "3rem" }}>
          Custom Packaging Samples
        </h1>
        <p className="hero-text">
          When you purchase a single box, you can check the quality and preview
          your design before placing a bulk order.
        </p>
      </div>

      {/* New 4 Cards Section */}
      <div className="samples-section">
        <div className="cards-container">
          {/* New Card 1 */}
          <div className="simple-card">
            <img
              src="https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp"
              alt="Shipping Box Orange"
              className="simple-card-image"
            />
            <h3 className="simple-card-title">Shipping Box Orange</h3>
          </div>

          {/* New Card 2 */}
          <div className="simple-card">
            <img
              src="https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp"
              alt="Shipping Box Blue"
              className="simple-card-image"
            />
            <h3 className="simple-card-title">Shipping Box Blue</h3>
          </div>

          {/* New Card 3 */}
          <div className="simple-card">
            <img
              src="https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp"
              alt="Shipping Box Green"
              className="simple-card-image"
            />
            <h3 className="simple-card-title">Shipping Box Green</h3>
          </div>

          {/* New Card 4 */}
          <div className="simple-card">
            <img
              src="https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp"
              alt="Shipping Box Red"
              className="simple-card-image"
            />
            <h3 className="simple-card-title">Shipping Box Red</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleProduct;
