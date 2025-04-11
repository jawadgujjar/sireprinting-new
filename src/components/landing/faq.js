import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./faq.css";

const Faq1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question:
        "Can I personalize the boxes in any size, color, and style with custom printed logo/artwork?",
      answer:
        "Yes, we are adept in producing custom boxes in any size, color, and shape with your own artwork printed. For your acknowledgment, you can review product pages with different options available. In case you are not able to find your desired need you can contact our Packaging Experts serving you 24/7 on live chat support.",
    },
    {
      question:
        "Can I customize stickers and woven labels in either way like die-cut shape, color, and stock with custom printed logo/artwork?",
      answer:
        "In general, your price is determined by the size and quantity of your selected product. We can provide a custom price quote based on your exact artwork and specifications for bulk quantity orders of 10,000pcs or more. Contact our sales team for a custom quote and we will reply with pricing and an estimated delivery date within 1 business day.",
    },
    {
      question: "Is there a minimum quantity to order?",
      answer:
        "We have set different minimum order quantity for product lines. Below are MOQ’s set according to product lines.Minimum Order Quantity for custom boxes is set to 50.Minimum Order Quantity for custom stickers is set to 100.Minimum Order Quantity for Woven Labels/Patches is set to 50.",
    },
    {
      question: "What is your turnaround time?",
      answer:
        "We do have three types of turnaround times that you can choose.Standard Turnaround Time (10-12 Business days to ship after approval on Final Spec Sheet) Expedite Turnaround Time (7-8 Business days to ship after approval on Final Spec Sheet) Rush Turnaround Time (4-6 Business days to ship after approval on Final Spec Sheet) All your orders will be processed with Standard Turnaround Time as FREE Shipping & Handling is a part of it. But if your choice is other than this, there would be additional shipping charges (contact sales) varies on order type.",
    },
    {
      question:
        "How do I request a quote for the project? How soon do I receive the price quote?",
      answer:
        "You can request a quote for your project by using any following method:You can fill in any online form available on the website commonly used product page form, which will not only help you choose the specifications but also providing you the related information. Other online forms are also available like “Get a Free Quote” & “Beat My Quote”.You can also get online assistance through our Live Chat Support, where 24/7 sales representative serving you proactively. You can chat with them and provide your packaging needs for a quick price quote.You can directly Email us at support@sireprinting.com, one of our packaging expert will be in touch with you for further assistance. Once your inquiry is submitted, the price quote will be sent your way no later than 24 hours.",
    },
    {
      question: "What if I don’t have the Design/Artwork file ready to print?",
      answer:
        "No Problem! You can unlock the feature of FREE Graphic Design Support by sending your inquiry or you can directly contact our Packaging Experts Team either through Live Chat or Email at support@sireprinting.com.",
    },
    {
      question:
        "What is the Free Graphic Design Support? Can I send my own Design/Artwork file?",
      answer:
        "We are providing FREE Graphic Design Support comprising the packaging design right from scratch to its pre-press ready. Also, the designing service we are offering is not static to one or twice revisions but we are committed to offering you multiple revisions till your satisfaction. We do have a very professional in-house designer’s team for this purpose. If you already have the design file ready you can submit the artwork file either through custom quote, product page form, or directly email to support@sireprinting.com and one of our representatives will be in touch with you for further assistance.",
    },
    {
      question: "How do I place my order?",
      answer:
        "Once you agreed with the price and approve the final artwork, you will be sending your billing and shipping address to your packaging expert or email at support@sireprinting.com in order to setup a secure payment link for your online order processing. All you just need to click the payment link and complete the order online using PayPal or Credit Card.",
    },
    {
      question: "Do you offer samples?",
      answer:
        "Generic Physical Sample Kit (to evaluate printing quality and stock) is always FREE with the order's amount of minimum $1000 if your order amount is less than $1000 you can still request a generic physical sample kit which will cost you $35. You can also request a physical sampling of your own boxes (Contact Sales for Pricing).",
    },
    {
      question: "What do I expect once my order is placed?",
      answer:
        "You will get order confirmation email from your packaging expert. Next you will be expecting a Final Spec Sheet for your approval along with the final design file and 3D mockup of your box which you need to review carefully as we would be needing your Approval on that before heading toward its production and shipping. Once you approve the final spec sheet and artwork files your order will be forward to production.",
    },
    {
      question: "Do you offer discounts on bulk quantity order?",
      answer:
        "Yes! The packaging industry has the simple formula “Price goes down as the quantity increases”. SirePrinting being a leading packaging company and offering its services more than a decade therefore wholesalers are welcome significantly. In order to serve this niche, we have specially made a department “Beat My Quote” where wholesalers can expect the better pricing from the market, all they just need to submit the requirements along with the market price quote you received and leave the rest on us and for sure we will beat the price for you.",
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="faq-header">
        <div className="faq-columns">
          <div className="faq-questions-col">
            <div className="faq-heading-col">
              <p className="frequently">
                <span className="span">Frequently</span> Asked Questions
              </p>
            </div>
            {faqs.map((faq, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq1;
