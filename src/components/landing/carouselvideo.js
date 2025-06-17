import React, { useState, useEffect } from "react";
import "./carouselvideo.css";
import { instagram } from "../../utils/axios";

function Videocarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate fetching Instagram posts
    const fetchInstagramPosts = async () => {
      try {
        const response = await instagram.get();
        setInstagramPosts(response.data);

        // Mock data - replace with your actual API call
        const mockData = [
          {
            imageUrl:
              "https://instagram.flhe44-1.fna.fbcdn.net/v/t51.29350-15/491417269_1174510267480999_1081103560534888209_n.heic?stp=dst-jpg_e35_s640x640_sh0.08_tt6&_nc_ht=instagram.flhe44-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QGflQ7qVJXkEVDVUx7-_9FKbv2EmKpFWLD8sLG_vhIrQxcLBUIKcL5iCDgrpIz8YYw&_nc_ohc=zHpr8xmRJGwQ7kNvwEr6Bta&_nc_gid=8iNnHiCfIYvZaMYXekHqkQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfOt2-9OiJE3OxGaT2qtrcKFCeJBxA36ovd31nA1QiUFNA&oe=685747F3&_nc_sid=8b3546",
            caption: "Photo by Sireprinting on April 23, 2025.",
            postUrl: "https://www.instagram.com/sireprinting/p/DIzwhnMIdSr/",
          },
          // Add other posts here or use the full response you provided
          {
            imageUrl:
              "https://instagram.flhe44-1.fna.fbcdn.net/v/t51.29350-15/490754581_648309221373671_5280820845294098682_n.heic?stp=dst-jpg_e35_s640x640_sh0.08_tt6&_nc_ht=instagram.flhe44-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QGflQ7qVJXkEVDVUx7-_9FKbv2EmKpFWLD8sLG_vhIrQxcLBUIKcL5iCDgrpIz8YYw&_nc_ohc=_IXkEyILQ4gQ7kNvwEzrDYJ&_nc_gid=8iNnHiCfIYvZaMYXekHqkQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfPSvS9-Wtvmr6cEOXLf_IZoqxggl8e-VtcSWKUCy834Lw&oe=68573DC7&_nc_sid=8b3546",
            caption: "Photo by Sireprinting on April 18, 2025.",
            postUrl: "https://www.instagram.com/sireprinting/p/DImOIPOoP3p/",
          },
        ];

        setInstagramPosts(mockData);
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
      }, 5000); // Change slide every 5 seconds

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
        {isLoading ? (
          <div className="loader-container">
            <img
              src="../images/logo.png"
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
      </div>
    </div>
  );
}

export default Videocarousel;
