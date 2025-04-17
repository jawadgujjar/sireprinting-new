import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import Productform1 from "../productform/productform";
import "./allproduct.css";

const { Meta } = Card;

const allProducts = [
  {
    titlerelatedProducts: [
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      {
        title: "Custom Mailer Boxes",
        description:
          "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
        hoverImage: "images/arka.webp",
      },
      // ... (other products remain the same)
    ],
  },
];

function Allproduct1() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (product) => {
    navigate("/main-product");
  };

  return (
    <div className="all-products-container">
      <div className="header-section">
        <h2 className="main-title">All Products</h2>
        <p className="subtitle">
          Sire Printing offers high-quality, customizable packaging that
          protects your products and enhances your brand. Choose from our range
          of eco-friendly options.
        </p>
      </div>

      <div className="packaging-info">
        <h2 className="packaging-txt">All Packaging Options</h2>
        <p className="packaging-sub">
          Need custom packaging? Can't find what you're looking for? Request a
          free quote and our packaging specialists will help you find the
          perfect solution.
        </p>
      </div>
      <div className="divider" />

      <div className="allproduct-main">
        <Row className="allproduct-row" gutter={[24, 16]}>
          <Col xs={24} md={16} lg={16} className="allproduct-col1">
            <Row gutter={[16, 16]}>
              {allProducts[0].titlerelatedProducts.map((card, index) => (
                <Col xs={12} sm={12} md={12} lg={8} key={index}>
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
                            alt={card.title}
                            src={card.image}
                            className={`allproduct-card-image ${
                              hoveredCard === index ? "fade-out" : "fade-in"
                            }`}
                          />
                          <img
                            alt={card.title}
                            src={card.hoverImage}
                            className={`allproduct-card-image hover ${
                              hoveredCard === index ? "fade-in" : "fade-out"
                            }`}
                          />
                        </div>
                      }
                      onClick={() => handleClick(card)}
                    >
                      <Meta
                        title={<span className="card-title">{card.title}</span>}
                        description={
                          <>
                            <p className="card-description">
                              {card.description}
                            </p>
                            <p className="card-price">{card.price}</p>
                          </>
                        }
                      />
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col
            xs={24}
            md={8}
            lg={8}
            className={`form-column ${scrolled ? "scrolled-form" : ""}`}
          >
            <div className="sticky-form-container">
              <Productform1 />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Allproduct1;
