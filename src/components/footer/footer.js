import React from "react";
import { Row, Col } from "antd";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaShippingFast,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer1() {
  return (
    <div className="footersire-footer">
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={6} className="footersire-column">
          <img src="../images/sire2.png" alt="Logo" />
          <div className="footer-input-container">
            <input
              type="email"
              placeholder="E-mail here"
              className="footer-input"
            />
            <button type="submit" className="submit-button">
              <FaPaperPlane />
            </button>
          </div>
          <p className="sirefooter-p-txt1">
            Subscribe to our newsletter and stay updated with our new products,
            policies, and terms.
          </p>
          <img
            src="../images/googleplay.png"
            alt="Google Play"
            style={{ marginTop: "1rem" }}
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className="footersire-column">
          <p className="get-txt">Get In Touch</p>
          <a href="tel:+447745807425" className="sirefooter-p-txt">
            <FaPhone /> 074 46124339
          </a>
          <a
            href="mailto:support@sireprinting.com"
            className="sirefooter-p-txt"
          >
            <FaEnvelope /> support@sireprinting.com
          </a>
          <p className="sirefooter-p-txt1">
            <FaMapMarkerAlt /> 5 South Charlotte Street Edinburgh EH2 4AN
          </p>
          <p className="sirefooter-p-txt1">
            <FaShippingFast /> 100% Free shipping all across USA
          </p>
          <div className="footersire-social-icons">
            <FaFacebook />
            <FaXTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
          <img
            src="../images/payment-cards.png"
            alt="Payment Methods"
            className="footer-visaimg"
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className="footersire-column">
          <p className="get-txt">Hot Selling Categories</p>
          <p className="sirefooter-p-txt">Corrugated Boxes</p>
          <p className="sirefooter-p-txt">Soap Packaging Boxes</p>
          <p className="sirefooter-p-txt">Woven Embroidered Patches</p>
          <p className="sirefooter-p-txt">CBD Packaging</p>
          <p className="sirefooter-p-txt">Custom Pillow Packaging Boxes</p>
          <p className="sirefooter-p-txt">Rigid Boxes</p>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className="footersire-column">
          <p className="get-txt">Useful Links</p>

          <Link to="/about-us" className="sirefooter-p-txt">
            About Us
          </Link>

          <Link to="/contact-us" className="sirefooter-p-txt">
            Contact Us
          </Link>

          <Link to="/portfolio" className="sirefooter-p-txt">
            Portfolio
          </Link>

          <Link to="/blog" className="sirefooter-p-txt">
            Blogs
          </Link>

          <Link to="/site-map" className="sirefooter-p-txt">
            Sitemap
          </Link>

          <Link to="/privacy" className="sirefooter-p-txt">
            Privacy Policy
          </Link>

          <Link to="/Terms and conditions" className="sirefooter-p-txt">
            Terms And Conditions
          </Link>
        </Col>
      </Row>

      <div className="footer-copyright">
        <p className="footer-p">
          Copyright ©2020 - 2024 Sire Printing | The Custom Websites
        </p>
      </div>
    </div>
  );
}

export default Footer1;
