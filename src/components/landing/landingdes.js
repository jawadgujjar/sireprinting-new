import React from "react";
import "./landingdes.css";

function Landingdes() {
  const contentSections = [
    {
      id: 1,
      title: "Premium Quality Materials",
      description:
        "We use only the highest quality materials for our packaging boxes, ensuring durability and protection for your products during shipping and handling. Our materials are eco-friendly and sustainable.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
      imagePosition: "right",
    },
    {
      id: 2,
      title: "Custom Design Options",
      description:
        "Create packaging that perfectly represents your brand with our custom design services. Choose from various colors, finishes, and printing techniques to make your packaging stand out.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
      imagePosition: "left",
    },
    // {
    //   id: 3,
    //   title: "Fast Turnaround Time",
    //   description:
    //     "We understand time is crucial for your business. Our efficient production process ensures quick turnaround times without compromising on quality.",
    //   image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    //   imagePosition: "right",
    // },
    // {
    //   id: 4,
    //   title: "Eco-Friendly Solutions",
    //   description:
    //     "Our sustainable packaging options help reduce environmental impact while maintaining the high quality your products deserve.",
    //   image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    //   imagePosition: "left",
    // },
  ];

  return (
    <div className="landingdes-container">
      <h2 className="landingdes-main-heading">Custom Packaging Solutions</h2>
      <h3 className="landingdes-sub-heading">
        Premium packaging tailored to your brand's unique requirements
      </h3>
      {contentSections.map((section) => (
        <div
          key={section.id}
          className={`landingdes-section ${
            section.imagePosition === "left" ? "landingdes-image-left" : "landingdes-image-right"
          }`}
        >
          <div className="landingdes-text">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div className="landingdes-image">
            <img
              src={section.image}
              alt={section.title}
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

export default Landingdes;
