import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import "./productimgs.css";

function Productimgs1({ images, selectedIndex, onImageSelect, title }) {
  const [selectedImage, setSelectedImage] = useState(selectedIndex || 0);
  const carouselRef = useRef(null);

  // Sync internal state with prop and handle carousel navigation
  useEffect(() => {
    setSelectedImage(selectedIndex);
    if (carouselRef.current) {
      carouselRef.current.goTo(selectedIndex, false); // false to prevent animation
    }
  }, [selectedIndex]);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index, false);
    }
    onImageSelect(index); // Trigger variant change
  };

  const handleMouseMove = (e) => {
    if (e.target.tagName === "IMG") {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      e.target.style.transformOrigin = `${x}% ${y}%`;
      e.target.style.transform = "scale(2)";
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.tagName === "IMG") {
      e.target.style.transform = "scale(1)";
      e.target.style.transformOrigin = "center center";
    }
  };

  return (
    <div className="product-image-container">
      <div className="thumbnail-vertical-wrapper">
        <button
          className="arrow-button"
          onClick={() => handleThumbnailClick(Math.max(selectedImage - 1, 0))}
          disabled={selectedImage === 0}
        >
          ▲
        </button>
        <div className="thumbnail-vertical">
          {images.map((src, index) => (
            <div
              key={index}
              className={`thumbnail-item-vertical ${
                selectedImage === index ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={src} alt={`${title} - ${index + 1}`} />
            </div>
          ))}
        </div>
        <button
          className="arrow-button"
          onClick={() =>
            handleThumbnailClick(Math.min(selectedImage + 1, images.length - 1))
          }
          disabled={selectedImage === images.length - 1}
        >
          ▼
        </button>
      </div>

      <div className="main-carousel">
        <Carousel
          ref={carouselRef}
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows
          beforeChange={(from, to) => {
            setSelectedImage(to);
            onImageSelect(to); // Trigger variant change on carousel swipe
          }}
        >
          {images.map((src, index) => (
            <div key={index} className="slide-container">
              <div className="zoom-wrapper">
                <img
                  src={src}
                  alt={`${title} - ${index + 1}`}
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
