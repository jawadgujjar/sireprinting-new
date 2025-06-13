import React, { useState, useEffect } from "react";
import { Modal, Button, Spin } from "antd";
import {
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
  LeftOutlined,
  RightOutlined,
  SendOutlined,
} from "@ant-design/icons";
import "./portfolio.css";
import { portfolio, product } from "../../utils/axios"; // Make sure you have both APIs configured

function Portfolio() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productIds, setProductIds] = useState([]); // Store only IDs from portfolio API
  const [products, setProducts] = useState([]); // Store full product details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // First fetch product IDs from portfolio API
  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const response = await portfolio.get("/");
        const ids = response.data.map((item) => item.productId);
        setProductIds(ids);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductIds();
  }, []);

  // Then fetch product details for each ID
  useEffect(() => {
    if (productIds.length === 0) return;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const productPromises = productIds.map(
          (id) => product.get(`/${id}`).catch(() => null) // Handle individual failures
        );
        const productResponses = await Promise.all(productPromises);
        const validProducts = productResponses
          .filter((res) => res !== null && res.data)
          .map((res) => {
            console.log("Variants:", res.data);
            return {
              id: res.data.productId,
              sku: res.data.sku || "N/A",
              image: res.data.image,
              name: res.data.title,
            };
          });
        setProducts(validProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productIds]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading our packaging solutions...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="empty-message">No products found</div>;
  }

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Our Packaging Solutions</h1>
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Product+Image";
              }}
            />
            <div className="product-overlay always-visible">
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/800x600?text=Product+Image";
                }}
              />
              <Button
                className="nav-button next-button"
                icon={<RightOutlined />}
                onClick={goToNext}
              />

              <div className="text-overlay-top">
                <h2>{products[currentIndex].name}</h2>
                <p className="preview-sku">SKU: {products[currentIndex].sku}</p>
              </div>

              <div className="preview-actions-overlay">
                <h2 type="default" className="pricing-btn">
                  Get Pricing for this Product
                </h2>
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
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Portfolio;
