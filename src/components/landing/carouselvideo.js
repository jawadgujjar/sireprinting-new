import React, { useEffect, useState } from "react";
// import "./carouselvideo.css";

function Videocarousel() {
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const initializeWidget = () => {
      const container = document.querySelector(".widget-container");
      if (!container) return;

      // Remove existing if any
      const existing = container.querySelector(".taggbox");
      if (existing) existing.remove();

      // Create new taggbox div
      const widgetDiv = document.createElement("div");
      widgetDiv.className = "taggbox";
      widgetDiv.setAttribute("data-widget-id", "288892");
      widgetDiv.style.width = "100%";
      widgetDiv.style.height = "100%";
      widgetDiv.style.overflow = "auto";

      container.appendChild(widgetDiv);

      const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://widget.taggbox.com/embed.min.js";
        script.async = true;

        script.onload = () => {
          if (window.Taggbox && typeof window.Taggbox.init === "function") {
            window.Taggbox.init();
            setStatus("loaded");
          } else {
            setStatus("error");
            setErrorMessage("Taggbox.init function not found");
          }
        };

        script.onerror = () => {
          setStatus("error");
          setErrorMessage("Failed to load Taggbox script");
        };

        document.body.appendChild(script);
      };

      if (!window.Taggbox) {
        loadScript();
      } else {
        try {
          window.Taggbox.init();
          setStatus("loaded");
        } catch (err) {
          setStatus("error");
          setErrorMessage("Taggbox failed to initialize: " + err.message);
        }
      }
    };

    initializeWidget();

    return () => {
      const widget = document.querySelector(".taggbox");
      if (widget) widget.remove();
    };
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <div
        className="widget-container"
        style={{
          width: "100%",
          // height: "425px",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        <div className="div-trustedtext">
          <h2 className="trustedtext" style={{ marginBottom: "3rem" }}>
            Get Inspiration
          </h2>
        </div>

        {status === "loading" && (
          <div className="loader-container">
            <img
              src="/images/logo.png"
              alt="Loading"
              className="loading-image"
            />
            <div className="loader"></div>
          </div>
        )}

        {status === "error" && (
          <div
            className="error-message"
            style={{
              height: "450px", // Adjust this height based on how much you want to show
              overflow: "hidden", // Cut off the "Powered by" part
              borderRadius: "12px",
            }}
          >
            <iframe
              src="https://widget.taggbox.com/288892?website=1"
              style={{
                width: "100%",
                height: "600px", // Keep actual iframe large enough so that content shifts up
                transform: "translateY(-38px)", // Move up to hide top part
                border: "none",
              }}
              title="Instagram Feed Fallback"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default Videocarousel;
