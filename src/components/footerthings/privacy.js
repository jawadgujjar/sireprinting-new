import React, { useState, useEffect } from "react";
import "./privacy.css";
import { privacy } from "../../utils/axios";
import { message } from "antd";
import SireprintingLoader from "../loader/loader";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

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

      {titles.map((title, index) => (
        <div key={index}>
          <h1 className="privacy-heading">{title}</h1>

          <div
            className="privacy-text"
            dangerouslySetInnerHTML={{
              __html: decodeHTML(descriptions[index] || "")
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default Privacy;
