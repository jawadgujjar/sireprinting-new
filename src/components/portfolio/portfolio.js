import React, { useState, useEffect, useRef } from "react";
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
import { portfolio, product } from "../../utils/axios";
import FormSubmit from "./formsubmit";

function Portfolio() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomState, setZoomState] = useState({
    isZoomed: false,
    zoomX: 0,
    zoomY: 0,
  });
  const [previewZoomState, setPreviewZoomState] = useState({
    isZoomed: false,
    zoomX: 0,
    zoomY: 0,
  });

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

  useEffect(() => {
    if (productIds.length === 0) return;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const productPromises = productIds.map((id) =>
          product.get(`/${id}`).catch(() => null)
        );
        const productResponses = await Promise.all(productPromises);
        const validProducts = productResponses
          .filter((res) => res !== null && res.data)
          .map((res) => {
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
    setPreviewZoomState({ isZoomed: false, zoomX: 0, zoomY: 0 });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setPreviewZoomState({ isZoomed: false, zoomX: 0, zoomY: 0 });
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
    setPreviewZoomState({ isZoomed: false, zoomX: 0, zoomY: 0 });
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomState({
      isZoomed: true,
      zoomX: x,
      zoomY: y,
    });
  };

  const handleMouseLeave = () => {
    setZoomState({
      isZoomed: false,
      zoomX: 0,
      zoomY: 0,
    });
  };

  const handlePreviewMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPreviewZoomState({
      isZoomed: true,
      zoomX: x,
      zoomY: y,
    });
  };

  const handlePreviewMouseLeave = () => {
    setPreviewZoomState({
      isZoomed: false,
      zoomX: 0,
      zoomY: 0,
    });
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
            <div
              className="zoom-wrapper"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`product-image ${
                  zoomState.isZoomed ? "zoomed" : ""
                }`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=Product+Image";
                }}
              />
              <div
                className="magnifier"
                style={{
                  backgroundImage: `url(${
                    product.image ||
                    "https://via.placeholder.com/300x200?text=Product+Image"
                  })`,
                  backgroundPosition: `${zoomState.zoomX}% ${zoomState.zoomY}%`,
                  display: zoomState.isZoomed ? "block" : "none",
                  transform: `translate(${zoomState.zoomX}%, ${zoomState.zoomY}%)`,
                }}
              />
            </div>
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
        style={{ maxWidth: "900px",top:14 }}
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
              <div
                className="zoom-wrapper"
                onMouseMove={handlePreviewMouseMove}
                onMouseLeave={handlePreviewMouseLeave}
              >
                <img
                  src={products[currentIndex].image}
                  alt={products[currentIndex].name}
                  className={`preview-image ${
                    previewZoomState.isZoomed ? "zoomed" : ""
                  }`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x600?text=Product+Image";
                  }}
                />
                <div
                  className="magnifier"
                  style={{
                    backgroundImage: `url(${
                      products[currentIndex].image ||
                      "https://via.placeholder.com/800x600?text=Product+Image"
                    })`,
                    backgroundPosition: `${previewZoomState.zoomX}% ${previewZoomState.zoomY}%`,
                    display: previewZoomState.isZoomed ? "block" : "none",
                    transform: `translate(${previewZoomState.zoomX}%, ${previewZoomState.zoomY}%)`,
                  }}
                />
              </div>
              <Button
                className="nav-button next-button"
                icon={<RightOutlined />}
                onClick={goToNext}
              />
              <div className="image-action-row">
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

            <div className="preview-details">
              <div className="product-info">
                <h1 className="product-title">{products[currentIndex].name}</h1>
                <p className="product-sku">SKU: {products[currentIndex].sku}</p>
              </div>
              <div className="preview-actions">
                <FormSubmit />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Portfolio;
