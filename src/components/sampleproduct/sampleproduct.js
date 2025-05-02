import React from "react";
import "./sampleproduct.css";
import { Button } from "antd";

function SampleProduct() {
  const sampleCards = [
    {
      title: "Random Sample",
      text: "These are random samples that we provide you from our recently manufactured boxes.",
      price: "$40",
      img: "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/random-sample.png",
    },
    {
      title: "Custom Sample",
      text: "Customized samples made according to your specific requirements and designs.",
      price: "$100",
      img: "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/plain-sample.png",
    },
    {
      title: "Premium Sample",
      text: "High-quality samples showcasing our premium materials and finishing options.",
      price: "Get Price",
      img: "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/pre-production-sample.png",
    },
  ];

  const customBoxes = [
    {
      title: "Shipping Box Orange",
      img: "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp",
    },
    {
      title: "Shipping Box Blue",
      img: "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp",
    },
    {
      title: "Shipping Box Green",
      img: "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp",
    },
    {
      title: "Shipping Box Red",
      img: "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/12/shipping-box-1-orange.webp",
    },
  ];

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
          {sampleCards.map((item, index) => (
            <div
              className="simple-card"
              key={index}
              style={{ height: "27rem", width: "30%" }}
            >
              <img src={item.img} alt={item.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
                <Button type="primary" className="price-button">
                  {item.price}
                </Button>
              </div>
            </div>
          ))}
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
          {customBoxes.map((box, index) => (
            <div className="simple-card" key={index}>
              <img
                src={box.img}
                alt={box.title}
                className="simple-card-image"
              />
              <h3 className="simple-card-title">{box.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SampleProduct;
