import React, { useState, useEffect } from "react";
import "./aboutus.css";
import { aboutus } from "../../utils/axios";
import { message } from "antd";
import SireprintingLoader from "../loader/loader";

function Aboutus() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await aboutus.get("/");
        setAboutData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about us data:", error);
        message.error(
          "Failed to load about us information. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return         <SireprintingLoader />
;
  }

  const titles = aboutData[0]?.title || [];
  const descriptions = aboutData[0]?.description || [];

  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      {titles.map((title, index) => (
        <div key={index}>
          <h2 className="about-subtitle">{title}</h2>
          <p className="about-text">
            {descriptions[index] || "No description available."}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Aboutus;
