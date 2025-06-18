import React from "react";
import "./productspecs.css";

function ProductSpecs({ currentVariant = {} }) {
  // Get variant specifications or empty array if none exist
  const specifications = currentVariant?.variantSpecifications || [];

  // Fallback specifications if none are provided
  const fallbackSpecs = [
    {
      _id: "1",
      title: "Self Locking",
      description:
        "Custom Roll End Front Tuck (REFT) mailer boxes with Dust Flaps and Cherry Locks offer round flaps that lock to secure your product in transit.",
      icon: "🔒",
    },
    {
      _id: "2",
      title: "Durable Construction",
      description:
        "Made with versatility and durability in mind, our 32 ECT mailer boxes can hold between 30 and 40 pounds of product.",
      icon: "📦",
    },
    {
      _id: "3",
      title: "Two-Sided Printing",
      description:
        "Personalize the look of your custom packaging by choosing two-sided prints that compliment your brand and its message.",
      icon: "🖨️",
    },
    {
      _id: "4",
      title: "Full Color Printing",
      description:
        "Don't limit your design to just one color. With full digital CMYK printing, you can choose as many colors as your design needs without the extra costs.",
      icon: "🎨",
    },
  ];

  // Use variant specifications if available, otherwise use fallback
  const displaySpecs =
    specifications.length > 0 ? specifications : fallbackSpecs;

  return (
    <div className="specs-container">
      <div className="div-trustedtext">
        <h2 className="trustedtext">Product Specifications</h2>
      </div>

      <div className="specs-grid">
        {displaySpecs.map((spec, index) => (
          <div className="spec-item" key={spec._id || index}>
            <div className="spec-top">
              {spec.image && (
                <img src={spec.image} alt={spec.title} className="spec-image" />
              )}
            </div>
            <div className="spec-bottom">
              <h3>{spec.title}</h3>
              <p>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSpecs;
