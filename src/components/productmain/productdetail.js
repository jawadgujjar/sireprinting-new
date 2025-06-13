import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import "./productdetail.css";

function Productdetail1({ data, currentVariant }) {
  const [isMoreDetailsOpen, setMoreDetailsOpen] = useState(true);
  const [isFaqOpen, setFaqOpen] = useState(false);
  const [isMaterialOpen, setMaterialOpen] = useState(false);
  const [isColorOpen, setColorOpen] = useState(false);
  const [isFinishingOpen, setFinishingOpen] = useState(false);
  const [isAddOnOpen, setAddOnOpen] = useState(false);
  const [isTurnaroundOpen, setTurnaroundOpen] = useState(false);

  // Extract data from currentVariant with fallbacks
  console.log(currentVariant, data);
  const variantDetail = currentVariant?.variantDetail || {};
  const faqs = currentVariant?.faqs || [];

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
                  {variantDetail.material?.map((item, index) => (
                    <React.Fragment key={index}>
                      <p>{item}</p>
                      {index < variantDetail.material.length - 1 && <hr />}
                    </React.Fragment>
                  )) || (
                    <p>FSC Certified Paper and OK Compost Certified 32 ECT</p>
                  )}
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
                  {variantDetail.colormodel?.map((item, index) => (
                    <React.Fragment key={index}>
                      <p>{item}</p>
                      {index < variantDetail.colormodel.length - 1 && <hr />}
                    </React.Fragment>
                  )) || <p>CMYK, Pantone, or Spot Colors available</p>}
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
                  {variantDetail.finishing?.map((item, index) => (
                    <React.Fragment key={index}>
                      <p>{item}</p>
                      {index < variantDetail.finishing.length - 1 && <hr />}
                    </React.Fragment>
                  )) || <p>Matte or Gloss coating options</p>}
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
                  {variantDetail.addon?.map((item, index) => (
                    <React.Fragment key={index}>
                      <p>{item}</p>
                      {index < variantDetail.addon.length - 1 && <hr />}
                    </React.Fragment>
                  )) || (
                    <p>Window patching, foil stamping, embossing available</p>
                  )}
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
                  {variantDetail.turnaround?.map((item, index) => (
                    <React.Fragment key={index}>
                      <p>{item}</p>
                      {index < variantDetail.turnaround.length - 1 && <hr />}
                    </React.Fragment>
                  )) || (
                    <p>Standard 7-10 business days, Rush options available</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick FAQ's */}
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
                  {faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                      <React.Fragment key={index}>
                        <p>
                          <strong>{faq.question}</strong>
                        </p>
                        <p>{faq.answer}</p>
                        {index < faqs.length - 1 && <hr />}
                      </React.Fragment>
                    ))
                  ) : (
                    <>
                      <p>
                        <strong>What materials do you use?</strong>
                      </p>
                      <p>
                        We use FSC Certified Paper and OK Compost Certified
                        materials
                      </p>
                      <hr />
                      <p>
                        <strong>What is your turnaround time?</strong>
                      </p>
                      <p>Standard production takes 7-10 business days</p>
                    </>
                  )}
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
