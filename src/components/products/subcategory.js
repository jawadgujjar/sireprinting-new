import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import "./subcategory.css";

function Subcategory() {
  const [selectedCategory, setSelectedCategory] = useState(1);

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
      name: "candle Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 5,
      name: "candle Boxes",
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
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <Row className="subcategory-products">
        {/* Left Column: Categories */}
        <Col xs={24} md={6} className="category-column">
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
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Packaging";
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Right Column: Products */}
        <Col xs={24} md={16}>
          <p
            className="subcategory-heading1"
            style={{ fontWeight: "bold" }}
          >
            {categories.find((c) => c.id === selectedCategory)?.name ||
              "Products"}
            <div className="divider1"></div>
          </p>
          <Row gutter={[16, 16]}>
            {productsByCategory[selectedCategory]?.map((product) => (
              <Col xs={12} sm={8} md={8} lg={8} key={product.id}>
                {/* <Link to={`/all-products/${product.id}`} className="product-link"> */}
                <Link to={`/all-products`} className="product-link">
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.image} />}
                    className="product-card"
                    bodyStyle={{ padding: "10px", overflow: "visible" }}
                  >
                    <div className="product-title">{product.name}</div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Subcategory;
