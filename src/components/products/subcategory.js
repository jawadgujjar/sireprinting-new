import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./subcategory.css";

const { Meta } = Card;

function Subcategory() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      name: "Custom Mailer Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 3,
      name: "Carry Bags",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 4,
      name: "Handle Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 5,
      name: "Candle Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
  ];

  const productsByCategory = {
    1: [
      { id: 1, name: "Product 1", image: "images/allproduct1.png" },
      { id: 2, name: "Product 2", image: "images/process1.png" },
      { id: 3, name: "Product 3", image: "images/allproduct1.png" },
      { id: 4, name: "Product 4", image: "images/allproduct1.png" },
      { id: 5, name: "Product 5", image: "images/allproduct1.png" },
      { id: 6, name: "Product 6", image: "images/allproduct1.png" },
    ],
    2: [
      { id: 7, name: "Mailer Box 1", image: "images/allproduct1.png" },
      { id: 8, name: "Mailer Box 2", image: "images/process1.png" },
      { id: 9, name: "Mailer Box 3", image: "images/allproduct1.png" },
    ],
    3: [
      { id: 10, name: "Carry Bag 1", image: "images/allproduct1.png" },
      { id: 11, name: "Carry Bag 2", image: "images/process1.png" },
    ],
    4: [
      { id: 12, name: "Handle Box 1", image: "images/allproduct1.png" },
      { id: 13, name: "Handle Box 2", image: "images/process1.png" },
      { id: 14, name: "Handle Box 3", image: "images/allproduct1.png" },
      { id: 15, name: "Handle Box 4", image: "images/allproduct1.png" },
    ],
    5: [
      { id: 16, name: "Candle Box 1", image: "images/allproduct1.png" },
      { id: 17, name: "Candle Box 2", image: "images/process1.png" },
    ],
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div>
      <Row className="subcategory-products">
        {/* Left Column: Categories */}
        <Col xs={24} md={6} className="category-column">
          {!isMobile ? (
            <>
              <p className="subcategory-heading1">
                Sub-Categories <div className="divider1"></div>
              </p>
              <div className="category-grid-container">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`category-card ${
                      selectedCategory === category.id ? "active-category" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="category-card-content">
                      <div className="category-text">
                        <h3 className="category-name">{category.name}</h3>
                      </div>
                      <div className="category-image-container">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="category-image"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/300x200?text=Packaging")
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mobile-accordion">
            <p className="subcategory-heading1">Categories</p>
            {categories.map((category) => (
              <div key={category.id} className="mobile-category">
                <div
                  className="mobile-category-header"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.name}</span>
                  <DownOutlined
                    className={`dropdown-arrow ${
                      selectedCategory === category.id ? "rotated" : ""
                    }`}
                  />
                </div>
                {selectedCategory === category.id && (
                  <div className="mobile-category-products">
                    <Row gutter={[16, 16]}>
                      {productsByCategory[category.id]?.map((product) => (
                        <Col xs={24} key={product.id}>
                          <Link to={`/all-products`} className="product-link">
                            <Card
                              hoverable
                              cover={<img alt={product.name} src={product.image} />}
                              className="product-card"
                              bodyStyle={{
                                padding: "10px",
                                overflow: "visible",
                              }}
                            >
                              <div className="product-title">{product.name}</div>
                            </Card>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          )}
        </Col>

        {/* Right Column: Products for Desktop */}
        {!isMobile && (
          <Col xs={24} sm={24} md={16}>
            <p className="subcategory-heading1" style={{ fontWeight: "bold" }}>
              {categories.find((c) => c.id === selectedCategory)?.name ||
                "Products"}
              <div className="divider1"></div>
            </p>
            <Row gutter={[16, 16]}>
              {productsByCategory[selectedCategory]?.map((product) => (
                <Col xs={24} sm={8} md={8} lg={8} key={product.id}>
                  <Link to={`/all-products`} className="product-link">
                    <Card
                      className="allproduct-card"
                      hoverable
                      cover={
                        <div className="card-image-container">
                          <img
                            alt={product.name}
                            src={product.image}
                            className="allproduct-card-image"
                          />
                        </div>
                      }
                    >
                      <Meta
                        title={
                          <span className="card-title">{product.name}</span>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Subcategory;
