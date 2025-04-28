import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import "./productimgs.css";

function Productimgs1() {
  const [selectedImage, setSelectedImage] = useState(0);
  const carouselRef = useRef(null);
  const videoRefs = useRef([]);

  const productMedia = [
    { type: "image", src: "/images/allproduct1.png" },
    { type: "video", src: "/video/video1.mp4" },
    { type: "image", src: "/images/arka.webp" },
    { type: "image", src: "/images/pillowproduct2.png" },
    { type: "video", src: "/videos/demo-video.mp4" },
    { type: "image", src: "/images/pillowproduct3.png" },
    { type: "image", src: "/images/pillowproduct4.png" },
  ];

  // Handle video play/pause when slide changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(selectedImage);
    }

    // Pause all videos first
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset video to start
      }
    });

    // Try to play current video if it's a video slide
    const currentMedia = productMedia[selectedImage];
    if (currentMedia.type === "video" && videoRefs.current[selectedImage]) {
      const video = videoRefs.current[selectedImage];
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
          // Show controls if autoplay fails
          video.controls = true;
        });
      }
    }
  }, [selectedImage]);

  const handleMouseMove = (e) => {
    if (e.target.tagName === 'IMG') {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      e.target.style.transformOrigin = `${x}% ${y}%`;
      e.target.style.transform = "scale(2)";
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.style.transform = "scale(1)";
      e.target.style.transformOrigin = "center center";
    }
  };

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
          {productMedia.map((media, index) => (
            <div
              key={index}
              className={`thumbnail-item-vertical ${selectedImage === index ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              {media.type === "image" ? (
                <img src={media.src} alt={`Thumbnail ${index + 1}`} />
              ) : (
                <div className="video-thumbnail">
                  <video muted playsInline>
                    <source src={media.src} type="video/mp4" />
                  </video>
                  <div className="play-icon">▶</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          className="arrow-button"
          onClick={() =>
            setSelectedImage((prev) => Math.min(prev + 1, productMedia.length - 1))
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
          {productMedia.map((media, index) => (
            <div key={index} className="slide-container">
              <div className="zoom-wrapper">
                {media.type === "image" ? (
                  <img
                    src={media.src}
                    alt={`Product ${index + 1}`}
                    className="main-product-image"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                ) : (
                  <video
                    ref={el => videoRefs.current[index] = el}
                    className="main-product-video"
                    controls // Always show controls
                    muted
                    playsInline
                    loop
                  >
                    <source src={media.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Productimgs1;
