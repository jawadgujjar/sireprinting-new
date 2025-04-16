import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './productdetail.css';

function Productdetail1() {
  const [isMoreDetailsOpen, setMoreDetailsOpen] = useState(true);
  const [isFaqOpen, setFaqOpen] = useState(false);

  return (
    <div className="productdetail-wrapper">
      <Row gutter={[24, 24]} align="top" justify="center">
        {/* Column 1: Need Design Help */}
        <Col xs={24} md={12}>
          <div className="design-help-container">
            <Row align="middle" justify="space-between">
              <Col span={18}>
                <h3>Need Design Help?</h3>
                <p>
                  Upload your artwork along with any instructions and our expert team of designers
                  will send you a proof of your personalized packaging design within 48 hours — on the house!
                </p>
                <Button className="design-help-btn">Get a Free Quote</Button>
              </Col>
              <Col span={6} className="icon-col">
                <div className="icon-wrapper">
                  <StarFilled className="sparkle-icon" />
                  <StarFilled className="sparkle-icon small" />
                  <StarFilled className="sparkle-icon small" />
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Column 2: Accordions */}
        <Col xs={24} md={12}>
          <div className="accordion-container">
            <div className="accordion-item">
              <div className="accordion-header" onClick={() => setMoreDetailsOpen(!isMoreDetailsOpen)}>
                <h2 style={{fontWeight:'bold'}}>More Details</h2>
                <span>{isMoreDetailsOpen ? '▾' : '▸'}</span>
              </div>
              {isMoreDetailsOpen && (
                <div className="accordion-content">
                  <p>Standardized or fully customizable sizing options</p>
                  <hr />
                  <p>FSC Certified Paper and OK Compost Certified 32 ECT</p>
                  <hr />
                  <p>Carbon-neutral packaging and fulfillment available</p>
                  <hr />
                  <p>Double-sided printing available</p>
                  <hr />
                  <p>Roll end lock front with dust flaps and cherry locks</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <div className="accordion-header" onClick={() => setFaqOpen(!isFaqOpen)}>
                <h2 style={{fontWeight:'bold'}}>Quick FAQ's</h2>
                <span>{isFaqOpen ? '▾' : '▸'}</span>
              </div>
              {isFaqOpen && (
                <div className="accordion-content">
                  <p>FAQ content goes here...</p>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Productdetail1;
