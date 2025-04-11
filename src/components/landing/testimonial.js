import React from "react";
import AliceCarousel from "react-alice-carousel";
import { Card, Avatar } from "antd";
import "react-alice-carousel/lib/alice-carousel.css";
import "./testimonial.css";
import Rating from "react-rating";

// Carousel items
const carouselItems = [
  {
    img: "../images/review.jpg",
    name: "John Wick",
    occupation: "Broker – About Roatan Real Estate",
    review:
      "“Thrive exceeded our expectations in every way. They are honest, reliable, and handle all needs quickly. They deliver on their promises without any fuss.”",
  },
  {
    img: "../images/review.jpg",
    name: "NINI",
    occupation: "Broker – About Roatan Real Estate",
    review:
      "“Working with Thrive has been a pleasure. Their dedication, exceptional support, and attention to our needs make us excited for a long-term partnership.”",
  },
  {
    img: "../images/review.jpg",
    name: "NINI",
    occupation: "Broker – About Roatan Real Estate",
    review:
      "“Working with Thrive has been a pleasure. Their dedication, exceptional support, and attention to our needs make us excited for a long-term partnership.”",
  },
];

// Render carousel items
const renderItems = () =>
  carouselItems.map((item, index) => (
    <div className="carousel-item-content" key={index}>
      <Card className="carousel-card">
        <Avatar className="avatar-review" src={item.img} />
        <h5>{item.name}</h5>
        <span>{item.occupation}</span>
        <Rating
          initialRating={5}
          emptySymbol={
            <i
              className="far fa-star"
              style={{ color: "#ccc", fontSize: "20px" }}
            />
          }
          fullSymbol={
            <i
              className="fas fa-star"
              style={{ color: "#fadb14", fontSize: "20px" }}
            />
          }
          readonly
        />{" "}
        <p>{item.review}</p>
      </Card>
    </div>
  ));

const Testimonial = () => {
  const carouselRef = React.useRef(null);

  return (
    <div className="customerdiv">
      <h1 className="customers">Testimonials</h1>
      {/* <p className="customer">Client highlighting our services and successful results.</p> */}
      <div className="carousel-wrapper">
        <div className="carousel-container1">
          <AliceCarousel
            ref={carouselRef}
            items={renderItems()}
            responsive={{
              0: { items: 1 },
              568: { items: 2 },
              1024: { items: 3 },
            }}
            controlsStrategy="alternate"
            autoPlay
            autoPlayInterval={3000}
            infinite
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
