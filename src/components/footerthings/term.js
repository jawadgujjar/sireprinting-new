import React, { useState, useEffect } from "react";
import "./term.css";
import { term } from "../../utils/axios";
import { message } from "antd";
import SireprintingLoader from "../loader/loader";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function Term() {
  const [termsData, setTermsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await term.get("/");
        console.log(response.data);
        setTermsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching terms:", error);
        message.error(
          "Failed to load terms and conditions. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const titles = termsData[0]?.title || [];
  const descriptions = termsData[0]?.description || [];

  return (
    <div className="term-container">
      <img
        className="img-cbdmain"
        src="../images/term.webp"
        alt="term"
        style={{
          width: "100%",
          height: "auto",
        }}
      />

      {titles.map((title, index) => (
        <div key={index}>
          <h1 className="term-heading">{title}</h1>

          <div
            className="term-text"
            dangerouslySetInnerHTML={{
              __html: decodeHTML(descriptions[index] || ""),
            }}
          ></div>
        </div>
      ))}

      <h2 className="term-subheading">How to Get in Touch with Us?</h2>

      <div className="term-text">
        If there are any questions regarding this privacy policy, you might call
        us using the details below.
        <br />
        <strong>Phone: (410) 834-9965</strong>
        <br />
        <strong>Email: support@sireprinting.com</strong>
      </div>
    </div>
  );
}

export default Term;
