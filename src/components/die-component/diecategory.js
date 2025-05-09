import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "./diecategory.css";

const { Meta } = Card;

function Diecategory() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    {
      id: 1,
      name: "Packaging Styles",
      image: "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    { id: 2, name: "Folding Boxes", image: "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp", count: 24 },
    { id: 3, name: "Tray Boxes", image: "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp", count: 24 },
    { id: 4, name: "Rigid Boxes", image: "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp", count: 24 },
    { id: 5, name: "Candle Boxes", image: "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp", count: 24 },
  ];

  const productsByCategory = {
    1: [
      { id: 1, name: "Product 1", image: "images/allproduct1.png" },
      { id: 2, name: "Product 2", image: "images/process1.png" },
      { id: 3, name: "Product 3", image: "images/allproduct1.png" },
      { id: 4, name: "Product 4", image: "images/allproduct1.png" },
      { id: 5, name: "Product 5", image: "images/allproduct1.png" },
      { id: 6, name: "Product 6", image: "images/allproduct1.png" },
    ],
    2: [
      { id: 7, name: "Mailer Box 1", image: "images/allproduct1.png" },
      { id: 8, name: "Mailer Box 2", image: "images/process1.png" },
      { id: 9, name: "Mailer Box 3", image: "images/allproduct1.png" },
    ],
    3: [
      { id: 10, name: "Carry Bag 1", image: "images/allproduct1.png" },
      { id: 11, name: "Carry Bag 2", image: "images/process1.png" },
    ],
    4: [
      { id: 12, name: "Handle Box 1", image: "images/allproduct1.png" },
      { id: 13, name: "Handle Box 2", image: "images/process1.png" },
      { id: 14, name: "Handle Box 3", image: "images/allproduct1.png" },
      { id: 15, name: "Handle Box 4", image: "images/allproduct1.png" },
    ],
    5: [
      { id: 16, name: "Candle Box 1", image: "images/allproduct1.png" },
      { id: 17, name: "Candle Box 2", image: "images/process1.png" },
    ],
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleDownloadPDF = async (product) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = product.image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: img.width > img.height ? "landscape" : "portrait",
        unit: "pt",
        format: [img.width, img.height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, img.width, img.height);

      // Show preview in new tab
      const blobUrl = pdf.output("bloburl");
      window.open(blobUrl, "_blank");

      // Optional: also download
      pdf.save(`${product.name}.pdf`);
    };

    img.onerror = () => {
      alert("Failed to load image. Cannot generate PDF.");
    };
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Row className="subcategory-products">
        <Col xs={24} md={6} className="category-column">
          {!isMobile ? (
            <>
              <p className="subcategory-heading1">
                Sub-Categories <div className="divider1"></div>
              </p>
              <div className="category-grid-container">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`category-card ${selectedCategory === category.id ? "active-category" : ""}`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="category-card-content">
                      <div className="category-text">
                        <h3 className="category-name">{category.name}</h3>
                      </div>
                      <div className="category-image-container">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="category-image"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/300x200?text=Packaging")}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mobile-accordion">
              <p className="subcategory-heading1">Sub-Categories</p>
              {categories.map((category) => (
                <div key={category.id} className="mobile-category">
                  <div
                    className="mobile-category-header"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span>{category.name}</span>
                    <DownOutlined
                      className={`dropdown-arrow ${selectedCategory === category.id ? "rotated" : ""}`}
                    />
                  </div>
                  {selectedCategory === category.id && (
                    <div className="mobile-category-products">
                      <Row gutter={[16, 16]}>
                        {productsByCategory[category.id]?.map((product) => (
                          <Col xs={24} key={product.id}>
                            <Link to={``} className="product-link">
                              <Card
                                hoverable
                                cover={<img alt={product.name} src={product.image} />}
                                className="product-card"
                                bodyStyle={{ padding: "10px", overflow: "visible" }}
                              >
                                <div className="product-title">{product.name}</div>
                                <div style={{ marginTop: "10px", textAlign: "center" }}>
                                  <Button type="primary" size="small" onClick={() => handleDownloadPDF(product)}>
                                    Download
                                  </Button>
                                </div>
                              </Card>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Col>

        {/* Desktop Products */}
        {!isMobile && (
          <Col xs={24} sm={24} md={16}>
            <p className="subcategory-heading1" style={{ fontWeight: "bold" }}>
              {categories.find((c) => c.id === selectedCategory)?.name || "Products"}
              <div className="divider1"></div>
            </p>
            <Row gutter={[16, 16]}>
              {productsByCategory[selectedCategory]?.map((product) => (
                <Col xs={24} sm={8} md={8} lg={8} key={product.id}>
                  <Link to={``} className="product-link">
                    <Card
                      className="allproduct-card"
                      hoverable
                      cover={
                        <div className="card-image-container">
                          <img
                            alt={product.name}
                            src={product.image}
                            className="allproduct-card-image"
                          />
                        </div>
                      }
                    >
                      <Meta title={<span className="card-title">{product.name}</span>} />
                      <div style={{ marginTop: "10px", textAlign: "center" }}>
                        <Button type="primary" size="small" onClick={() => handleDownloadPDF(product)}>
                          Download
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Diecategory;
