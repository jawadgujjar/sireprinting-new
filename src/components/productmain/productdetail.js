import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import "./productdetail.css";

function Productdetail1() {
  const [isMoreDetailsOpen, setMoreDetailsOpen] = useState(true);
  const [isFaqOpen, setFaqOpen] = useState(false);
  const [isMaterialOpen, setMaterialOpen] = useState(false);
  const [isColorOpen, setColorOpen] = useState(false);
  const [isFinishingOpen, setFinishingOpen] = useState(false);
  const [isAddOnOpen, setAddOnOpen] = useState(false);
  const [isTurnaroundOpen, setTurnaroundOpen] = useState(false);

  return (
    <div className="productdetail-wrapper">
      <Row gutter={[24, 24]} align="top" justify="center">
        {/* Column 1: Need Design Help */}
        <Col xs={24} md={12}>
          <div className="design-help-container">
            <Row align="middle" justify="space-between">
              <Col span={18} style={{ color: "#fff" }}>
                <h3>Need Design Help?</h3>
                <p style={{ color: "#fff" }}>
                  Upload your artwork along with any instructions and our expert
                  team of designers will send you a proof of your personalized
                  packaging design within 48 hours — on the house!
                </p>
                <Link to="/get-a-quote">
                  <Button className="design-help-btn">Get a Free Quote</Button>
                </Link>
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
          <div className="icon-grid">
            <div className="icon-item">
              <img src="/images/1.webp" alt="Icon 1" className="icon-img" />
              <p className="icon-text">High Quality</p>
            </div>
            <div className="icon-item">
              <img src="/images/2.webp" alt="Icon 2" className="icon-img" />
              <p className="icon-text">Custom Design</p>
            </div>
            <div className="icon-item">
              <img
                src="/images/Eco-Friendly.png"
                alt="Icon 3"
                className="icon-img"
              />
              <p className="icon-text">Eco Friendly</p>
            </div>
            <div className="icon-item">
              <img src="/images/3.webp" alt="Icon 4" className="icon-img" />
              <p className="icon-text">Free Delivery</p>
            </div>
            <div className="icon-item">
              <img src="/images/1.webp" alt="Icon 5" className="icon-img" />
              <p className="icon-text">Affordable</p>
            </div>
            <div className="icon-item">
              <img src="/images/2.webp" alt="Icon 6" className="icon-img" />
              <p className="icon-text">24/7 Support</p>
            </div>
          </div>
        </Col>
        {/* Column 2: Accordions */}
        <Col xs={24} md={12}>
          <div className="accordion-container">
            {/* More Details */}
            {/* <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => setMoreDetailsOpen(!isMoreDetailsOpen)}
              >
                <p style={{ fontWeight: "bold" }}>More Details</p>
                <span>{isMoreDetailsOpen ? "▾" : "▸"}</span>
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
            </div> */}

            {/* Material */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => setMaterialOpen(!isMaterialOpen)}
              >
                <p style={{ fontWeight: "bold" }}>Material</p>
                <span>{isMaterialOpen ? "▾" : "▸"}</span>
              </div>
              {isMaterialOpen && (
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

            {/* Color Models */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => setColorOpen(!isColorOpen)}
              >
                <p style={{ fontWeight: "bold" }}>Color Models</p>
                <span>{isColorOpen ? "▾" : "▸"}</span>
              </div>
              {isColorOpen && (
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

            {/* Finishing */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => setFinishingOpen(!isFinishingOpen)}
              >
                <p style={{ fontWeight: "bold" }}>Finishing</p>
                <span>{isFinishingOpen ? "▾" : "▸"}</span>
              </div>
              {isFinishingOpen && (
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

            {/* Add-on and Coating Options */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => setAddOnOpen(!isAddOnOpen)}
              >
                <p style={{ fontWeight: "bold" }}>Add-on and Coating Options</p>
                <span>{isAddOnOpen ? "▾" : "▸"}</span>
              </div>
              {isAddOnOpen && (
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

            {/* Turnaround Time */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => setTurnaroundOpen(!isTurnaroundOpen)}
              >
                <p style={{ fontWeight: "bold" }}>Turnaround Time</p>
                <span>{isTurnaroundOpen ? "▾" : "▸"}</span>
              </div>
              {isTurnaroundOpen && (
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
              <div
                className="accordion-header"
                onClick={() => setFaqOpen(!isFaqOpen)}
              >
                <p style={{ fontWeight: "bold" }}>Quick FAQ's</p>
                <span>{isFaqOpen ? "▾" : "▸"}</span>
              </div>
              {isFaqOpen && (
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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Productdetail1;
