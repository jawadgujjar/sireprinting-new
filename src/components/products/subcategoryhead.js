import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./subcategoryhead.css";

function Subcategoryhead({ data }) {
  return (
    <div className="subcategory-container">
      <Row className="subcategory-row">
        <Col xs={24} md={12} className="subcategory-left">
          <h1 className="hero-title">{data?.title}</h1>
          <div className="hero-divider"></div>
          <p className="hero-description">
            {/* You can use data.seoDescription or create a custom one */}
            {data?.description ||
              "We offer custom printed packaging designed to fit your brand perfectly."}
          </p>
          <Link to="/get-a-quote">
            <button className="get-pricing-button">Get Pricing</button>
          </Link>
        </Col>
        <Col xs={24} md={12} className="subcategory-right">
          <img
            src={data?.pageImage || "/images/landing1.png"}
            alt={data?.title}
            className="hero-image-sub"
          />
        </Col>
      </Row>
    </div>
  );
}

export default Subcategoryhead;
