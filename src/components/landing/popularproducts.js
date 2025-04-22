import React from "react";
import { Row, Col } from "antd";
import "./popularproducts.css";
import ProductCarousel from "./productcarousel";

const cardData = [
  {
    title: "Low Minimums",
    description: "Only order what you need.",
    img: "https://www.arka.com/cdn/shop/files/Frame_428.png?v=1717179391",
  },
  {
    title: "Sustainable Options",
    description: "Only order what you need.",
    img: "https://www.arka.com/cdn/shop/files/Frame_432.png?v=1717179391",
  },
  {
    title: "Fully Customizable",
    description: "Only order what you need.",
    img: "https://www.arka.com/cdn/shop/files/Frame_433_0bb1965a-0b07-40b5-bb76-2c75790a53ab.png?v=1717179391",
  },
  {
    title: "Quick Turnaround",
    description: "Only order what you need.",
    img: "https://www.arka.com/cdn/shop/files/Frame_436.png?v=1717179391",
  },
];

function Popularproducts() {
  return (
    <div>
      <div className="popular-products-container">
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
