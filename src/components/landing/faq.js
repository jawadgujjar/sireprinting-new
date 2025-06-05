import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Row, Col, Image, Spin, message } from "antd";
import "./faq.css";
import { faq } from "../../utils/axios";

const Faq1 = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await faq.get("/"); // backend route
        setFaqs(res.data.faqs);
      } catch (err) {
        message.error("Failed to load FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const imageURLs = [
    "../images/Black_Soap_Boxes_SirePrinting.jpeg",
    "../images/CBD_Concentrate_Packaging_Boxes_SirePrinting.jpg",
    "../images/Die_Cut_Soap_Boxes_SirePrinting.jpeg",
    "../images/Food_Packaging_Sleeves_SirePrinting.jpg",
    "../images/Holographic_Stickers_SirePrinting.jpeg",
    "../images/Lip_Balm_Display_Boxes_SirePrinting.jpg",
    "../images/Serum_Boxes_SirePrinting.jpeg",
    "../images/SoapBox__Stickers_SirePrinting.jpeg",
    "../images/Custom Mailer Boxes with Inserts.png",
  ];

  return (
    <section id="faq" style={{ padding: "2rem 1rem", marginTop: "2rem" }}>
      <Row gutter={[24, 24]} justify="space-evenly" align="top">
        {/* Left Image Gallery */}
        <Col xs={24} md={10} lg={10}>
          <Row gutter={[16, 16]} justify="center">
            {imageURLs.map((url, index) => (
              <Col key={`image-${index}`} span={8}>
                <Image
                  className="images-faq"
                  src={url}
                  alt={`Box Sample ${index + 1}`}
                  preview={false}
                  style={{
                    borderRadius: "8px",
                    transform:
                      index === 3 || index === 4 ? "scale(1.05)" : "none",
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* Right FAQ */}
        <Col xs={24} md={14} lg={12}>
          <div className="faq-heading-col">
            <p className="frequently">
              <span className="span">Frequently</span> Asked Questions
            </p>
          </div>

          {loading ? (
            <Spin size="large" />
          ) : (
            faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.question}
                  <span className="faq-toggle-icon">
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))
          )}
        </Col>
      </Row>
    </section>
  );
};

export default Faq1;
