import React from "react";
import { Card, Row, Col, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./allproduct.css";

const { Search } = Input;

function Allproduct1() {
  const navigate = useNavigate();

  const productCategories = [
    {
      title: "CUSTOM BOXES",
      image: "https://via.placeholder.com/300x200?text=Custom+Boxes",
    },
    {
      title: "UNBRANDED",
      image: "https://via.placeholder.com/300x200?text=Unbranded",
    },
    {
      title: "ACCESSORIES",
      image: "https://via.placeholder.com/300x200?text=Accessories",
    },
    {
      title: "BOXES BY SIZES",
      image: "https://via.placeholder.com/300x200?text=Boxes+By+Sizes",
    },
  ];

  const handleClick = (category) => {
    const slug = category.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/products/${slug}`);
  };

  return (
    <div className="all-products-container">
      <div className="header-section">
        <h1 className="main-title">All Products</h1>
        <p className="subtitle">
          Arka is your one-stop shop for all your packaging needs. Choose from a
          range of branded and unbranded options that best suit your needs.
        </p>
      </div>

      <div className="divider"></div>

      <div className="products-section">
        <h2 className="section-title">ALL PRODUCTS</h2>

        <div className="search-container">
          <Search
            placeholder="Search products..."
            allowClear
            enterButton
            size="large"
            className="product-search"
          />
        </div>

        <Row gutter={[24, 24]} className="product-categories">
          {productCategories.map((category, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={category.title}
                    src={category.image}
                    className="category-image"
                  />
                }
                onClick={() => handleClick(category)}
                className="product-card"
              >
                <div className="category-title">{category.title}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Allproduct1;
