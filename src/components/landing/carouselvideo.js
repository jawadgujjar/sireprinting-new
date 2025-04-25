import React, { useState, useEffect } from "react";

function Videocarousel() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
          height:"425px",
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        {isLoading ? (
          <p>loading....</p>
        ) : (
          <>
            <div className="div-trustedtext">
              <h2 className="trustedtext">Get Inspiration</h2>
            </div>
            <iframe
              src="https://71a478a187ec4fad9a5538a7214d4bca.elf.site/"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "12px",
              }}
              title="Video Carousel"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </>
        )}
      </div>
    </div>
  );
}

export default Videocarousel;
