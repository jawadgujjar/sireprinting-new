import React from "react";
import "../products/catdes.css";

function Productdescription({ currentVariant }) {
  // Get variant details or empty object if none exist
  const variantDetails = currentVariant || {};

  // Fallback details if none are provided
  const fallbackDetails = {
    detailTitle: "Premium Packaging Solutions",
    detailSubtitle: "Custom designed for your brand",
    detailDescription: [
      {
        _id: "1",
        description:
          "Our packaging is designed to protect your products while showcasing your brand beautifully.",
        image: "https://via.placeholder.com/600x400?text=Packaging",
      },
      {
        _id: "2",
        description:
          "Eco-friendly materials that don't compromise on quality or durability.",
        image: "https://via.placeholder.com/600x400?text=Eco+Friendly",
      },
    ],
  };

  // Use variant details if available, otherwise use fallback
  const displayDetails = {
    detailTitle: variantDetails.detailTitle || fallbackDetails.detailTitle,
    detailSubtitle:
      variantDetails.detailSubtitle || fallbackDetails.detailSubtitle,
    details:
      variantDetails.detailDescription?.length > 0
        ? variantDetails.detailDescription
        : fallbackDetails.detailDescription,
  };

  if (!displayDetails.details) return null;

  return (
    <div className="category-description-container">
      <h2 className="main-heading">{displayDetails.detailTitle}</h2>
      <h3 className="sub-heading">{displayDetails.detailSubtitle}</h3>

      {displayDetails.details.map((section, index) => (
        <div
          key={section._id || index}
          className={`content-section ${
            index % 2 === 0 ? "image-right" : "image-left"
          }`}
        >
          <div className="text-content">
            <p dangerouslySetInnerHTML={{ __html: section.description }} />
          </div>
          <div className="image-content">
            <img
              src={section.image}
              alt={`Detail ${index + 1}`}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x400?text=Packaging";
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Productdescription;
