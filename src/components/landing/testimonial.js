// Testimonial.js
import React from "react";
import { Row, Col, Progress, Rate, Button, Image } from "antd";
import { StarFilled } from "@ant-design/icons";
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
  {
    name: "Tony Stark",
    rating: 5,
    img: "../images/review.jpg",
    review: "Highly recommend. Support team is awesome and always available.",
  },
  {
    name: "Bruce Wayne",
    rating: 4,
    img: "../images/review.jpg",
    review:
      "Impressive! Their service is outstanding and the team is very helpful.",
  },
];

const Testimonial = () => {
  return (
    <div className="testimonial-main">
      <h2 className="testimonials-main">Testimonials</h2>
      <hr />
      <Row className="testimonial-summary-row" gutter={[30, 30]}>
        <Col xs={24} md={10}>
          <h2 className="rating-text">
            4.7/5 <span>(33 reviews)</span>
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
        </Col>
        <Col xs={24} md={14}>
          <Image.PreviewGroup>
            <div className="review-images-row">
              {reviewImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`review ${index}`}
                  className="review-img"
                  preview={{ mask: "Click to Preview" }}
                />
              ))}
            </div>
          </Image.PreviewGroup>
        </Col>
      </Row>
      <div className="reviews-section">
        <h2 className="testimonials-main-sec">All Reviews</h2>
        {reviews.slice(0, 4).map((rev, i) => (
          <div className="review-card" key={i}>
            <Rate disabled defaultValue={rev.rating} className="star-rating" />
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
    </div>
  );
};

export default Testimonial;
