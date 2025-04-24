import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Row, Col, Image } from "antd";
import "./faq.css";

const Faq1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question:
        "Can I personalize the boxes in any size, color, and style with custom printed logo/artwork?",
      answer:
        "Yes, we are adept in producing custom boxes in any size, color, and shape with your own artwork printed...",
    },
    {
      question:
        "Can I customize stickers and woven labels in either way like die-cut shape, color, and stock with custom printed logo/artwork?",
      answer:
        "In general, your price is determined by the size and quantity of your selected product...",
    },
    {
      question: "Is there a minimum quantity to order?",
      answer:
        "We have set different minimum order quantity for product lines...",
    },
    {
      question: "What is your turnaround time?",
      answer:
        "We do have three types of turnaround times that you can choose...",
    },
    {
      question:
        "How do I request a quote for the project? How soon do I receive the price quote?",
      answer:
        "You can request a quote for your project by using any following method...",
    },
    {
      question: "What if I don’t have the Design/Artwork file ready to print?",
      answer:
        "No Problem! You can unlock the feature of FREE Graphic Design Support...",
    },
    {
      question:
        "What is the Free Graphic Design Support? Can I send my own Design/Artwork file?",
      answer:
        "We are providing FREE Graphic Design Support comprising the packaging design right from scratch...",
    },
    {
      question: "How do I place my order?",
      answer:
        "Once you agreed with the price and approve the final artwork, you will be sending your billing and shipping address...",
    },
    {
      question: "Do you offer samples?",
      answer:
        "Generic Physical Sample Kit (to evaluate printing quality and stock) is always FREE with the order's amount of minimum $1000...",
    },
    {
      question: "What do I expect once my order is placed?",
      answer:
        "You will get order confirmation email from your packaging expert. Next you will be expecting a Final Spec Sheet for your approval...",
    },
    {
      question: "Do you offer discounts on bulk quantity order?",
      answer:
        "Yes! The packaging industry has the simple formula “Price goes down as the quantity increases”...",
    },
  ];

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
        {/* Left Side Image Gallery */}
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

        {/* Right Side FAQ Section */}
        <Col xs={24} md={14} lg={12}>
          <div className="faq-heading-col">
            <p className="frequently">
              <span className="span">Frequently</span> Asked Questions
            </p>
          </div>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                {faq.question}
                <span className="faq-toggle-icon">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </section>
  );
};

export default Faq1;
