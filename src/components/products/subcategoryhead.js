import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./subcategoryhead.css";

function Subcategoryhead() {
  return (
    <div className="subcategory-container">
      <Row className="subcategory-row">
        <Col xs={24} md={12} className="subcategory-left">
          <h2 className="subcategory-heading">CBD Packaging Boxes</h2>
          <p className="subcategory-description">
            Sire Packaging is a leading supplier of custom printed CBD packaging
            boxes offering customized packaging solutions to elevate your
            product’s impact in the wellness and supplement market. From oils,
            serums, tinctures to gummies and everything in between, we produce
            
          </p>
          <Link to="/get-a-quote">
            <button className="get-pricing-button">Get Pricing</button>
          </Link>
        </Col>
        <Col xs={24} md={12} className="subcategory-right">
          <img
            src="/images/landing1.png"
            alt="Service Visual"
            className="subcategory-image"
          />
        </Col>
      </Row>
    </div>
  );
}

export default Subcategoryhead;
