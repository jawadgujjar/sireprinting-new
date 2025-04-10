import React from "react";
import { Row, Col, Tabs } from "antd"; // Import Row and Col from Ant Design
import "./popularproducts.css"; // Import CSS for custom styling

const { TabPane } = Tabs;

function Popularproducts() {
  return (
    <div>
      <div className="popular-products-container">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="product-item">
              <div>
                <img
                  className="image-popular"
                  alt="first"
                  src="https://www.arka.com/cdn/shop/files/Frame_428.png?v=1717179391"
                />
              </div>
              <div>
                <h3>Low Minimums</h3>
                <p>Only order what you need.</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="product-item">
              <div>
                <img
                  className="image-popular"
                  alt="first"
                  src="https://www.arka.com/cdn/shop/files/Frame_432.png?v=1717179391"
                />
              </div>
              <div>
                <h3>Sustainable Options</h3>
                <p>Only order what you need.</p>
              </div>
            </div>{" "}
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="product-item">
              <div>
                <img
                  className="image-popular"
                  alt="first"
                  src="https://www.arka.com/cdn/shop/files/Frame_433_0bb1965a-0b07-40b5-bb76-2c75790a53ab.png?v=1717179391"
                />
              </div>
              <div>
                <h3>Fully Customizable</h3>
                <p>Only order what you need.</p>
              </div>
            </div>{" "}
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="product-item">
              <div>
                <img
                  className="image-popular"
                  alt="first"
                  src="https://www.arka.com/cdn/shop/files/Frame_436.png?v=1717179391"
                />
              </div>
              <div>
                <h3>Quick Turnaround</h3>
                <p>Only order what you need.</p>
              </div>
            </div>{" "}
          </Col>
        </Row>
      </div>
      <div className="popular-text">
        <h3>Popular Products</h3>
      </div>
      <div className="tabs-container">
        <div className="tabs-style">
          <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
            <TabPane tab="Tab 1" key="1">
              <h2>Content for Tab 1</h2>
              <p>This is the content for the first tab.</p>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <h2>Content for Tab 2</h2>
              <p>This is the content for the second tab.</p>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Popularproducts;
