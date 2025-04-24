import React from "react";
import { Row, Col } from "antd";
import "./popularproducts.css";
import ProductCarousel from "./productcarousel";

const cardData = [
  {
    title: "Low Minimums",
    description: "Only order what you need.",
    img: "../images/icon1.svg",
  },
  {
    title: "Sustainable Options",
    description: "Only order what you need.",
    img: "../images/icon2.svg",
  },
  {
    title: "Fully Customizable",
    description: "Only order what you need.",
    img: "../images/icon3.svg",
  },
  {
    title: "Quick Turnaround",
    description: "Only order what you need.",
    img: "../images/icon4.svg",
  },
];

function Popularproducts() {
  return (
    <div>
      <div className="popular-products-container">
        <div className="div-trustedtext">
          {" "}
          <h2 className="trustedtext">
            {" "}
            Your Packaging, Your Way – Complete Control
          </h2>
        </div>
        <p className="industry-main-p">
          Your product deserves packaging that speaks your brand. With us,
          you're in charge — every fold, color, and finish is your call. We
          empower you to create packaging that's not just protective, but
          powerful. Let's build something unforgettable, together.
        </p>
        <Row gutter={[16, 16]} justify="center">
          {cardData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <div className="product-item">
                <div>
                  <img
                    className="image-popular"
                    alt={card.title}
                    src={card.img}
                  />
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <p className="popularpro-p">{card.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="products-container">
        <div>
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
}

export default Popularproducts;
