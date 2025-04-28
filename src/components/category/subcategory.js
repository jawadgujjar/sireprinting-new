import React from "react";
import { Row, Col, Card } from "antd";
import "./subcategory.css";

function Subcategory() {
  const categories = [
    {
      id: 1,
      name: "Custom Packaging Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 2,
      name: "Custom mailer Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 3,
      name: "Custom mailer Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
    {
      id: 4,
      name: "Custom mailer Boxes",
      image:
        "https://customboxesbase.com/wp-content/uploads/2025/04/Carry-bags-Photoroom-1024x1024.webp",
      count: 24,
    },
  ];

  return (
    <div>
      <div className="subcategory-container">
        <div className="div-txt">
          <div className="category-info">Category: Carriers & Handle Boxes</div>
          <p style={{textAlign:'left',color:'#01257D',fontSize:'1rem',marginTop:'1rem'}}>
            This is a demo text for the short description of the packaging
            product page and will be use for the products and the products in
            the packaging.
          </p>
        </div>
      </div>

      {/* Row and Col layout from Ant Design */}
      <Row className="subcategory-products">
        {/* First Column with a Card that contains an image and text */}
        <Col xs={24} md={8}>
          <p style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Categories</p>
          {categories.map((category) => (
            <Card
              hoverable
              cover={<img alt="example" src={category.image} />}
              className="category-card"
              key={category.id}
            >
              <div className="category-card-content">
                <div className="category-text">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-count">{category.count} products</p>
                </div>
              </div>
            </Card>
          ))}
        </Col>

        {/* Second Column with 3 Product Cards */}
        <Col xs={24} md={16}>
          <p style={{ fontWeight: "bold", fontSize: "2.5rem", }}>
            Sub-Categories
          </p>
          <Row>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product1" src="images/allproduct1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 1</div>
              </Card>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product2" src="images/process1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 2</div>
              </Card>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product3" src="images/allproduct1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 3</div>
              </Card>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product3" src="images/allproduct1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 3</div>
              </Card>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product3" src="images/allproduct1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 3</div>
              </Card>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product3" src="images/allproduct1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 3</div>
              </Card>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product3" src="images/allproduct1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 3</div>
              </Card>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt="product3" src="images/allproduct1.png" />}
                className="product-card"
                bodyStyle={{ padding: "10px", overflow: "visible" }}
              >
                <div className="product-title">Product 3</div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Subcategory;
