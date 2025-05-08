import React from 'react';
import { Row, Col } from 'antd';
import './diehead.css';

function Diehead() {
  return (
    <div className="diehead-section">
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12}>
          <div className="diehead-text">
            <h1>Free Custom Packaging Dieline Templates for All Box Styles</h1>
            <p>
              Looking for ready-to-use dieline templates for your custom boxes?
              Discover a complete collection of free dieline templates from Dream Custom Boxes designed for all major box styles.
              Whether you need a dieline for a mailer box, <span className="highlight">tuck end box</span>, or <span className="highlight">rigid setup box</span>,
              our custom box dielines are available in ready-to-edit formats like PDF and AI.
              Perfect for packaging designers, brand managers, or business owners,
              our printable dieline files ensure your custom box layout is accurate, professional, and print-ready.
              Start creating flawless packaging dielines with confidence today—without starting from scratch!
            </p>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="diehead-image-wrapper">
            <img src="/images/arka.webp" alt="Box Template" className="diehead-image" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Diehead;
