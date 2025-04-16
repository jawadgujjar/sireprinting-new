import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import "./productimgs.css";

function Productimgs1() {
  const [selectedImage, setSelectedImage] = useState(0);
  const carouselRef = useRef(null);

  const productImages = [
    "/images/allproduct1.png",
    "/images/arka.webp",
    "/images/pillowproduct2.png",
    "/images/pillowproduct3.png",
    "/images/pillowproduct4.png",
  ];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.target.style.transformOrigin = `${x}% ${y}%`;
    e.target.style.transform = "scale(2)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.transformOrigin = "center center";
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(selectedImage);
    }
  }, [selectedImage]);

  return (
    <div className="product-image-container">
      <div className="thumbnail-vertical-wrapper">
        <button
          className="arrow-button"
          onClick={() => setSelectedImage((prev) => Math.max(prev - 1, 0))}
        >
          ▲
        </button>
        <div className="thumbnail-vertical">
          {productImages.map((image, index) => (
            <div
              key={index}
              className={`thumbnail-item-vertical ${selectedImage === index ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
        <button
          className="arrow-button"
          onClick={() =>
            setSelectedImage((prev) => Math.min(prev + 1, productImages.length - 1))
          }
        >
          ▼
        </button>
      </div>

      <div className="main-carousel">
        <Carousel
          ref={carouselRef}
          dots={false}
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows
        >
          {productImages.map((image, index) => (
            <div key={index} className="slide-container">
              <div className="zoom-wrapper">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="main-product-image"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Productimgs1;