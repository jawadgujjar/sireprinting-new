import React from "react";
import { Row, Col, Progress, Rate, Button, Image } from "antd";
import { EyeOutlined, StarFilled } from "@ant-design/icons";
import "./testimonial.css";

const starData = [
  { star: 5, count: 21 },
  { star: 4, count: 7 },
  { star: 3, count: 3 },
  { star: 2, count: 1 },
  { star: 1, count: 1 },
];

const reviewImages = [
  "../images/review.jpg",
  "../images/review.jpg",
  "../images/review.jpg",
  "../images/review.jpg",
  "../images/review.jpg",
  "../images/review.jpg",
];

const reviews = [
  {
    name: "John Wick",
    rating: 5,
    img: "../images/review.jpg",
    review:
      "Thrive exceeded our expectations in every way. Honest, reliable and quick to help.",
  },
  {
    name: "Sarah Connor",
    rating: 4,
    img: "../images/review.jpg",
    review:
      "Amazing experience! They really go above and beyond. I had some issues and they solved them instantly.",
  },
];

const Testimonial = () => {
  return (
    <div className="testimonial-main">
      <div className="testimonial-header">
        <h2 className="trustedtext">Testimonials</h2>
      </div>
      <p className="industry-main-p">
        Hear from our satisfied clients who’ve experienced the difference. From
        small businesses to large enterprises, our custom packaging has made a
        lasting impact.{" "}
      </p>
      <Row gutter={[24, 24]} className="testimonial-content-row">
        {/* Rating Summary Column */}
        <Col xs={24} sm={12} lg={8}>
          <div className="rating-summary-card">
            <h2 className="rating-text">
              4.7/
              <span className="rating-denominator">5</span>{" "}
              <span className="review-count">(33 reviews)</span>
            </h2>
            {starData.map((item, index) => (
              <div className="star-bar" key={index}>
                <span className="star-label">
                  {item.star} <StarFilled />
                </span>
                <Progress
                  percent={(item.count / 33) * 100}
                  showInfo={false}
                  strokeColor="#ffd700"
                />
                <span className="star-count">{item.count}</span>
              </div>
            ))}
          </div>
        </Col>

        {/* Review Images Column */}
        <Col xs={24} sm={12} lg={8}>
          <div className="review-images-card">
            <h3 className="customer-review-text">Customer Gallery</h3>
            <Image.PreviewGroup>
              <div className="review-images-grid">
                {reviewImages.map((img, index) => (
                  <div className="image-container" key={index}>
                    <Image
                      src={img}
                      alt={`Customer review ${index + 1}`}
                      className="review-img"
                      preview={{
                        mask: (
                          <EyeOutlined
                            style={{ color: "#fff", fontSize: "18px" }}
                          />
                        ),
                      }}
                    />
                    {/* <div className="image-hover-overlay">
                      <EyeOutlined
                        style={{ color: "#fff", fontSize: "24px" }}
                      />
                    </div> */}
                  </div>
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
        </Col>

        {/* Customer Reviews Column */}
        <Col xs={24} sm={24} lg={8}>
          <div className="reviews-card">
            <h3 className="testimonials-main-sec">Top Reviews</h3>
            {reviews.map((rev, i) => (
              <div className="review-card" key={i}>
                <Rate
                  disabled
                  defaultValue={rev.rating}
                  className="star-rating"
                />
                <h4>{rev.name}</h4>
                <p>{rev.review}</p>
              </div>
            ))}
            <div className="show-more-btn">
              <Button size="large" className="golden-btn">
                Show More Reviews
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Testimonial;
