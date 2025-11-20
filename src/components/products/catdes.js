import React from "react";
import "./catdes.css";

function Categorydescription({ data }) {
  if (!data) return null;

  return (
    <div className="cat-description-container">
      <h2 className="cat-main-heading">{data.detailTitle}</h2>
      <h3 className="cat-sub-heading">{data.detailSubtitle}</h3>

      {data.details?.map((section, index) => {
        // Only consider it a real image if it exists and is not a placeholder
        const hasImage =
          section.image &&
          section.image.trim() !== "" &&
          !section.image.includes("placeholder.com");

        // Decide layout class
        const layoutClass = hasImage
          ? index % 2 === 0
            ? "cat-image-right"
            : "cat-image-left"
          : "cat-no-image";

        return (
          <div
            key={section._id || index}
            className={`cat-content-section ${layoutClass}`}
          >
            <div className="cat-text-content">
              <p>{section.detailDescription}</p>
            </div>

            {hasImage && (
              <div className="cat-image-content">
                <img
                  src={section.image}
                  alt={`Detail ${index + 1}`}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Categorydescription;
