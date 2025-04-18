import React, { useState } from "react";
import { Modal, Button } from "antd";
import {
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LeftOutlined,
  RightOutlined,
  SendOutlined,
} from "@ant-design/icons";
import "./portfolio.css";

function Portfolio() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample product data
  const products = [
    {
      id: 1,
      sku: "SKU-001",
      image:
        "https://s3.amazonaws.com/sireprinting.com/portfolios/1697935989-2-piece-box-with-window-lid-sire-printing.avif",
      name: "Premium Office Chair",
    },
    {
      id: 2,
      sku: "SKU-002",
      image:
        "https://s3.amazonaws.com/sireprinting.com/portfolios/1697935989-2-piece-box-with-window-lid-sire-printing.avif",
      name: "Ergonomic Keyboard",
    },
    {
      id: 3,
      sku: "SKU-003",
      image:
        "https://s3.amazonaws.com/sireprinting.com/portfolios/1697935989-2-piece-box-with-window-lid-sire-printing.avif",
      name: "Wireless Headphones",
    },
    {
      id: 4,
      sku: "SKU-004",
      image:
        "https://s3.amazonaws.com/sireprinting.com/portfolios/1697935989-2-piece-box-with-window-lid-sire-printing.avif",
      name: "4K Monitor",
    },
    {
      id: 5,
      sku: "SKU-005",
      image:
        "https://s3.amazonaws.com/sireprinting.com/portfolios/1697935989-2-piece-box-with-window-lid-sire-printing.avif",
      name: "Gaming Mouse",
    },
    {
      id: 6,
      sku: "SKU-006",
      image:
        "https://s3.amazonaws.com/sireprinting.com/portfolios/1697935989-2-piece-box-with-window-lid-sire-printing.avif",
      name: "Bluetooth Speaker",
    },
  ];

  const showPreview = (index) => {
    setCurrentIndex(index);
    setPreviewVisible(true);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Portfolio</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => showPreview(index)}
          >
            <div className="sku-tag">{product.sku}</div>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-overlay">
              <span className="product-name">{product.name}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        visible={previewVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ maxWidth: "900px" }}
        className="product-preview-modal"
      >
        {products[currentIndex] && (
          <div className="preview-content">
            <div className="preview-image-container">
              <Button
                className="nav-button prev-button"
                icon={<LeftOutlined />}
                onClick={goToPrev}
              />
              <img
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                className="preview-image"
              />
              <Button
                className="nav-button next-button"
                icon={<RightOutlined />}
                onClick={goToNext}
              />

              {/* Text Overlay at Top Center */}
              <div className="text-overlay-top">
                <h2>{products[currentIndex].name}</h2>
                <p className="preview-sku">SKU: {products[currentIndex].sku}</p>
              </div>

              {/* Action Buttons Overlay at Bottom */}
              <div className="preview-actions-overlay">
                <div className="action-icons">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<WhatsAppOutlined />}
                    className="whatsapp-btn"
                  />
                  <Button
                    shape="circle"
                    icon={<MailOutlined />}
                    className="email-btn"
                  />
                  <Button
                    shape="circle"
                    icon={<MessageOutlined />}
                    className="chat-btn"
                  />
                  <Button
                    shape="circle"
                    icon={<SendOutlined />}
                    className="email-btn"
                  />
                </div>
                <Button type="default" className="pricing-btn">
                  Get Pricing for this Product
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Portfolio;
