import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import "./category.css";
import Productform1 from "../productform/productform";
import Benefits from "./benefits";
import Faq1 from "../landing/faq";
import Banner from "../landing/banner";
import Categorydescription from "./catdes";

function Category() {
  const categories = [
    {
      id: 1,
      name: "Custom Packaging Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 2,
      name: "CBD Packaging",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 18,
    },
    {
      id: 3,
      name: "Chocolate Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 32,
    },
    {
      id: 4,
      name: "Cosmetic Packaging",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 15,
    },
    {
      id: 5,
      name: "Gift Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 27,
    },
    {
      id: 6,
      name: "Rigid Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 21,
    },
    {
      id: 7,
      name: "Mylar Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 12,
    },
    {
      id: 8,
      name: "Custom Stickers",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 36,
    },
    {
      id: 7,
      name: "Mylar Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 12,
    },
    {
      id: 8,
      name: "Custom Stickers",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 36,
    },
    {
      id: 7,
      name: "Mylar Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 12,
    },
    {
      id: 8,
      name: "Custom Stickers",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 36,
    },
    {
      id: 7,
      name: "Mylar Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 12,
    },
    {
      id: 8,
      name: "Custom Stickers",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 36,
    },
    {
      id: 7,
      name: "Mylar Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 12,
    },
    {
      id: 8,
      name: "Custom Stickers",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 36,
    },
    {
      id: 7,
      name: "Mylar Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 12,
    },
    {
      id: 8,
      name: "Custom Stickers",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 36,
    },
    {
      id: 7,
      name: "Mylar Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 12,
    },
    {
      id: 8,
      name: "Custom Stickers",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 36,
    },
  ];
  return (
    <div>
      <div className="category-page-container">
        {/* Hero Section */}
        <div className="category-hero">
          <div className="hero-content">
            <h1 className="hero-title">Custom Packaging Boxes</h1>
            <div className="hero-divider"></div>
            <p className="hero-description">
              Custom apparel packaging from Ryt Packaging combines elegance and
              functionality to elevate your brand's presentation. Our bespoke
              boxes are designed to protect and showcase your clothing line,
              leaving a lasting impression.
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Customizable Options</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Premium Materials</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Brand Identity Focus</span>
              </div>
            </div>
          </div>
          <div className="hero-image-container">
            <img
              className="hero-image"
              src="../images/landing1.png"
              alt="Premium Packaging"
            />
          </div>
        </div>

        {/* Category Section */}
        <div className="category-section">
          <Row className="category-content-row">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={14}
              xl={14}
              className="category-col"
            >
              <div>
                <h2 className="hero-title-one">
                  Custom Packaging Boxes Sub-Categories
                </h2>
              </div>
              <div className="category-grid-container">
                {categories.map((category) => (
                  <Link
                    to={`/category/${category.id}`}
                    key={category.id}
                    className="category-card"
                  >
                    <div className="category-card-content">
                      <div className="category-text">
                        <h3 className="category-name">{category.name}</h3>
                        <p className="category-count">
                          {category.count} products
                        </p>
                      </div>
                      <div className="category-image-container">
                        <img
                          src="https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp"
                          alt={category.name}
                          className="category-image"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x200?text=Packaging";
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8} xl={8} className="form-col">
              <div className="cat-form">
                <Productform1 />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Categorydescription />
      <Benefits />
      <Banner />
      <Faq1 />
    </div>
  );
}

export default Category;
