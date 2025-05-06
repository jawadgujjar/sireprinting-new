import React from "react";
import "./blog.css";
import { Col, Row, Carousel } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

const blogContent = {
  title: "The Art of Sustainable Packaging",
  description:
    "Discover how eco-friendly materials are revolutionizing the packaging industry and how you can implement these solutions.",
  author: {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
  body: (
    <>
      <p>
        In today's environmentally-conscious market, sustainable packaging is no
        longer a luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses. In today's
        environmentally-conscious market, sustainable packaging is no longer a
        luxury but a necessity. This article explores biodegradable,
        compostable, and recyclable options for modern businesses.
      </p>
      <h4>Pros:</h4>
      <ul>
        <li>Eco-friendly materials reduce carbon footprint</li>
        <li>Appeals to environmentally aware customers</li>
        <li>Can improve brand image</li>
      </ul>
      <h4>Cons:</h4>
      <ul>
        <li>Initial cost may be higher</li>
        <li>Availability of materials can vary</li>
      </ul>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Material</th>
            <th>Biodegradable</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plastic</td>
            <td>No</td>
            <td>Low</td>
          </tr>
          <tr>
            <td>Kraft Paper</td>
            <td>Yes</td>
            <td>Medium</td>
          </tr>
          <tr>
            <td>Cornstarch</td>
            <td>Yes</td>
            <td>High</td>
          </tr>
        </tbody>
      </table>
    </>
  ),
};

// Sample carousel items
const carouselItems = [
  {
    id: 1,
    title: "Mailer Box",
    image: "/images/arka.png",
  },
  {
    id: 2,
    title: "Window Box",
    image: "/images/arka.png",
  },
  {
    id: 3,
    title: "Corrugated Box",
    image: "/images/arka.png",
  },
  {
    id: 4,
    title: "Mailer Box",
    image: "/images/arka.png",
  },
  {
    id: 5,
    title: "Window Box",
    image: "/images/arka.png",
  },
  {
    id: 6,
    title: "Corrugated Box",
    image: "/images/arka.png",
  },
  {
    id: 7,
    title: "Mailer Box",
    image: "/images/arka.png",
  },
  {
    id: 8,
    title: "Window Box",
    image: "/images/arka.png",
  },
  {
    id: 9,
    title: "Corrugated Box",
    image: "/images/arka.png",
  },
];

function MainBlogRedesign() {
  return (
    <div className="blog-redesign-container">
      {/* Social Media Icons Column */}
      <div className="social-icons-column">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaFacebookF style={{ fontSize: "25px" }}/>

        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <TwitterOutlined style={{ fontSize: "25px" }} />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedinIn style={{ fontSize: "25px" }} />
        </a>
      </div>
      {/* Top Section */}
      <Row gutter={[24, 24]} align="middle" className="top-section">
        <Col xs={24} md={12}>
          <h1 className="blog-title">{blogContent.title}</h1>
          <p className="blog-description">{blogContent.description}</p>
          <div className="author-info">
            <img
              src={blogContent.author.avatar}
              alt={blogContent.author.name}
              className="author-avatar"
            />
            <span className="author-name">{blogContent.author.name}</span>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <img src={blogContent.image} className="main-image" alt="Main blog" />
        </Col>
      </Row>

      {/* Second Section */}
      <Row gutter={[24, 24]} className="second-section">
        <Col xs={24} md={16}>
          <div className="blog-body">{blogContent.body}</div>
          <h3 className="carousel-heading">Related Products</h3>
          <Carousel
            dots={false}
            slidesToShow={5}
            autoplay
            className="product-carousel"
          >
            {carouselItems.map((item) => (
              <div className="carousel-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="carousel-img"
                />
                <div className="carousel-title">{item.title}</div>
              </div>
            ))}
          </Carousel>
        </Col>
        <Col xs={24} md={8}>
          <div className="side-banner-container">
            <img
              src="../images/blog_banner.png"
              alt="Banner"
              className="side-banner"
            />
            <a href="/get-a-quote" className="get-quote-button">
              Get a Quote
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MainBlogRedesign;
