import React from "react";
import { Row, Col, Card } from "antd";
import Productform1 from "../productform/productform";
import "./allproduct.css"

const { Meta } = Card;

const allProducts = [
  {
    titlerelatedProducts: [
      {
        title: "Custom Mailer Boxes",
        description: "Eco-friendly and Sustainable, the preferred packaging choice for...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
      },
      {
        title: "Custom Poly Mailers",
        description: "A fully custom high quality self sealing poly mailer.",
        price: "As low as: $0.85/unit",
        image: "images/allproduct1.png",
      },
      {
        title: "Custom Shipping Boxes",
        description: "The Shipping or Regular Slotted Carton (RSC) is the most common...",
        price: "As low as: $0.99/unit",
        image: "images/allproduct1.png",
      },
    ],
  },
];

function handleClick(product) {
  console.log("Product clicked:", product);
}

function Allproduct1() {
  return (
    <div className="all-products-container">
      <div className="header-section">
        <h2 className="main-title">All Products</h2>
        <p className="subtitle">
          Sire Printing is your one-stop shop for all your packaging needs.
          Choose from a range of branded and unbranded options that best suit
          your needs.
        </p>
      </div>

      <div className="divider" />

      <div className="packaging-info">
        <h2 className="packaging-txt">All Packaging Options</h2>
        <p className="packaging-sub">
          Searching for packaging services near me? Looking for something that's
          not listed below? Request a custom quote and our Arka Pro team will
          get back to you.
        </p>
      </div>

      <div className="allproduct-main">
        <Row className="allproduct-row" gutter={[24, 16]}>
          <Col xs={24} md={16} lg={16} className="allproduct-col1">
            <Row gutter={[16, 16]}>
              {allProducts[0].titlerelatedProducts.map((card, index) => (
                <Col xs={24} sm={12} md={12} lg={8} key={index}>
                  <Card
                    className="allproduct-card"
                    hoverable
                    cover={
                      <img
                        alt={card.title}
                        src={card.image}
                        className="allproduct-card-image"
                      />
                    }
                    onClick={() => handleClick(card)}
                    style={{ cursor: "pointer" }}
                  >
                    <Meta
                      title={card.title}
                      description={
                        <>
                          <p className="card-description">{card.description}</p>
                          <p className="card-price">{card.price}</p>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={24} md={8} lg={8} className="form-column">
            <Productform1/>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Allproduct1;