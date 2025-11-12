import React, { useState, useEffect } from "react";
import "./privacy.css";
import { privacy } from "../../utils/axios";
import { message } from "antd";
import SireprintingLoader from "../loader/loader";

function Privacy() {
  const [privacyData, setPrivacyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const response = await privacy.get("/");
        setPrivacyData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
        message.error("Failed to load privacy policy. Please try again later.");
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

//   if (loading) {
//     return         <SireprintingLoader />
// ;
//   }

  const titles = privacyData[0]?.title || [];
  const descriptions = privacyData[0]?.description || [];

  return (
    <div className="privacy-container">
      <img
        className="img-cbdmain"
        src="../images/privacy.webp"
        alt="cbd-main"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <h1 className="privacy-heading">Privacy Policy</h1>

      {titles.map((title, index) => (
        <div key={index}>
          <h2 className="privacy-subheading">{title}</h2>
          <p className="privacy-text">
            {descriptions[index] || "No description available."}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Privacy;
