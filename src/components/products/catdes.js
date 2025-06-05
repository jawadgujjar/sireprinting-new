import React from "react";
import "./catdes.css";

function Categorydescription({ data }) {
  if (!data) return null;

  return (
    <div className="category-description-container">
      <h2 className="main-heading">{data.detailTitle}</h2>
      <h3 className="sub-heading">{data.detailSubtitle}</h3>

      {data.details?.map((section, index) => (
        <div
          key={section._id}
          className={`content-section ${
            index % 2 === 0 ? "image-right" : "image-left"
          }`}
        >
          <div className="text-content">
            <p>{section.detailDescription}</p>
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

export default Categorydescription;
