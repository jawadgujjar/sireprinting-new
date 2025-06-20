import React from "react";
import parse from "html-react-parser";
import he from "he";
import "../products/catdes.css";

function Productdescription({ currentVariant }) {
  // Get variant details or empty object if none exist
  const variantDetails = currentVariant || {};

  const displayDetails = {
    detailTitle: variantDetails.detailTitle,
    detailSubtitle: variantDetails.detailSubtitle,
    details:
      variantDetails.detailDescription?.length > 0
        ? variantDetails.detailDescription
        : [],
  };

  if (!displayDetails.details) return null;

  return (
    <div className="category-description-container">
      <h2 className="main-heading">{displayDetails.detailTitle}</h2>
      <h3 className="sub-heading">{displayDetails.detailSubtitle}</h3>

      {displayDetails.details.map((section, index) => {
        const hasImage = section.image && section.image.trim() !== "";
        const hasText =
          section.description && section.description.trim() !== "";

        return (
          <div
            key={section._id || index}
            className={`content-section ${
              !hasImage || !hasText
                ? "single-content"
                : index % 2 === 0
                ? "image-right"
                : "image-left"
            }`}
          >
            {hasText && (
              <div className="text-content">
                <div className="description-content">
                  {parse(he.decode(section.description))}
                </div>
              </div>
            )}
            {hasImage && (
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
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Productdescription;
