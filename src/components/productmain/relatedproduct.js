import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./relatedproduct.css";

const { Meta } = Card;

const relatedProducts = [
  {
    title: "Custom Kraft Boxes",
    description:
      "Made from recycled material, ideal for eco-conscious packaging.",
    price: "As low as: $1.05/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
  {
    title: "Custom Retail Boxes",
    description: "Stylish and sturdy, perfect for retail shelf display.",
    price: "As low as: $1.20/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
  {
    title: "Custom Corrugated Boxes",
    description: "Durable boxes for heavy-duty shipping needs.",
    price: "As low as: $1.50/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
  {
    title: "Custom Display Boxes",
    description: "Eye-catching boxes for promotional purposes.",
    price: "As low as: $1.10/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
  {
    title: "Custom Apparel Boxes",
    description: "Tailored boxes for clothing and fashion items.",
    price: "As low as: $1.30/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
  {
    title: "Custom Corrugated Boxes",
    description: "Durable boxes for heavy-duty shipping needs.",
    price: "As low as: $1.50/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
  {
    title: "Custom Display Boxes",
    description: "Eye-catching boxes for promotional purposes.",
    price: "As low as: $1.10/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
  {
    title: "Custom Apparel Boxes",
    description: "Tailored boxes for clothing and fashion items.",
    price: "As low as: $1.30/unit",
    image: "images/allproduct1.png",
    hoverImage: "images/arka.webp",
  },
];

function Relatedproduct() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  const handleClick = (product) => {
    console.log("Related Product clicked:", product);
    navigate("/main-product");
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="related-products-section">
      <div className="div-trustedtext">
        <h2 className="trustedtext">Related Products</h2>
      </div>
      <Row gutter={[16, 16]} className="related-row">
        {relatedProducts.slice(0, visibleCount).map((product, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <div
              className="product-card-wrapper"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className="allproduct-card"
                hoverable
                cover={
                  <div className="card-image-container">
                    <img
                      alt={product.title}
                      src={product.image}
                      className={`allproduct-card-image ${
                        hoveredCard === index ? "fade-out" : "fade-in"
                      }`}
                    />
                    <img
                      alt={product.title}
                      src={product.hoverImage}
                      className={`allproduct-card-image hover ${
                        hoveredCard === index ? "fade-in" : "fade-out"
                      }`}
                    />
                  </div>
                }
                onClick={() => handleClick(product)}
              >
                <Meta
                  title={<span className="card-title">{product.title}</span>}
                  description={
                    <>
                      <p className="card-description">{product.description}</p>
                      <p className="card-price">{product.price}</p>
                    </>
                  }
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {visibleCount < relatedProducts.length && (
        <div className="show-more-button-wrapper">
          <Button
            type="primary"
            onClick={handleShowMore}
            className="show-more-button"
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}

export default Relatedproduct;
