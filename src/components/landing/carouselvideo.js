import React, { useState, useEffect } from "react";
import "./carouselvideo.css";
import { instagram } from "../../utils/axios";

function Videocarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await instagram.get();

        // Mock data for now – replace with response.data if API works
        const mockData = [
          {
            imageUrl:
              "https://instagram.flhe44-1.fna.fbcdn.net/v/t51.29350-15/491417269_1174510267480999_1081103560534888209_n.heic?...",
            caption: "Photo by Sireprinting on April 23, 2025.",
            postUrl: "https://www.instagram.com/sireprinting/p/DIzwhnMIdSr/",
          },
          {
            imageUrl:
              "https://instagram.flhe44-1.fna.fbcdn.net/v/t51.29350-15/490754581_648309221373671_5280820845294098682_n.heic?...",
            caption: "Photo by Sireprinting on April 18, 2025.",
            postUrl: "https://www.instagram.com/sireprinting/p/DImOIPOoP3p/",
          },
        ];

        setInstagramPosts(mockData); // or use: setInstagramPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  useEffect(() => {
    if (instagramPosts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === instagramPosts.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [instagramPosts]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? instagramPosts.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === instagramPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "425px",
          overflow: "hidden",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        {/* Loader */}
        {isLoading ? (
          <div className="loader-container">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="loading-image"
            />
            <div className="loader"></div>
          </div>
        ) : instagramPosts.length > 0 ? (
          <>
            <div className="div-trustedtext">
              <h2 className="trustedtext">Get Inspiration</h2>
            </div>

            <div className="carousel-container">
              {instagramPosts.map((post, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={post.imageUrl}
                      alt={`Instagram post ${index}`}
                      className="carousel-image"
                    />
                    <div className="carousel-caption">
                      {post.caption.length > 100
                        ? `${post.caption.substring(0, 100)}...`
                        : post.caption}
                    </div>
                  </a>
                </div>
              ))}

              <button className="carousel-button prev" onClick={goToPrev}>
                &#10094;
              </button>
              <button className="carousel-button next" onClick={goToNext}>
                &#10095;
              </button>

              <div className="carousel-indicators">
                {instagramPosts.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="no-posts">No Instagram posts available</div>
        )}

        {/* Embedded Iframe (Tagembed) */}
        <div className="div-trustedtext">
          <h2 className="trustedtext">Get Inspiration</h2>
        </div>

        <iframe
          src="https://widget.tagembed.com/embed/12345?view"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "12px",
          }}
          title="Instagram Feed"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  );
}

export default Videocarousel;
