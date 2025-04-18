import React, { useState } from "react";
import Slider from "react-slick";
import "./productcarousel.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Arrows import

const logos = [
  {
    title: "Custom Packaging Box",
    description: "High-quality packaging for your business.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
  {
    title: "Luxury Gift Box",
    description: "Elegant design with premium finish.",
    images: ["../images/arka.png", "../images/brand2.avif"],
  },
];

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <div className="arrow next" onClick={onClick}>
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev" onClick={onClick}>
    <FaArrowLeft />
  </div>
);

const ProductCarousel = () => {
  const settings = {
    infinite: true,
    speed: 1000, // Normal scroll speed
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Slide change every 2 seconds
    cssEase: "ease-in-out", // Smooth transition
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="trusted">
      <h2 className="trustedtext"> CUSTOM BOXES BY SIRE PRINTING</h2>
      <Slider {...settings} className="scrolling-slider">
        {logos.map((item, index) => (
          <HoverCard key={index} product={item} />
        ))}
      </Slider>
    </div>
  );
};

const HoverCard = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  React.useEffect(() => {
    let interval;
    if (hovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % product.images.length);
      }, 600);
    }
    return () => clearInterval(interval);
  }, [hovered, product.images.length]);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentIndex(0);
      }}
    >
      <img
        src={product.images[currentIndex]}
        alt={product.title}
        className="product-img"
      />
      <div className="product-title-css">{product.title}</div>
      <div className="product-desc">{product.description}</div>
    </div>
  );
};

export default ProductCarousel;
