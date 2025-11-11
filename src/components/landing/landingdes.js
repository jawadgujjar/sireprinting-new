import React from "react";
import "./landingdes.css";

function Landingdes() {
  const contentSections = [
    {
      id: 1,
      title: "Premium Quality Materials",
      description:
        "Cheap Custom Packaging prioritizes high-quality materials to ensure that our custom packaging and boxes are durable, reliable, and eco-friendly. We use high-grade cardboard, Kraft, and rigid substrates to create custom box packaging that protects your products during shipping and handling. Whatever you need for custom shipping boxes in USA or custom printed packaging for small business products, our materials guarantee strength and sustainability. Our custom box wholesale options provide cost-effective solutions without compromising on quality. Using environmentally friendly materials aligns with our commitment to green packaging. With our premium-quality custom boxes featuring your logo, your products are protected while making a strong brand impression. From sturdy packing company solutions to stylish custom packaging boxes in USA, we deliver boxes that last and leave a positive impact on your customers.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
      imagePosition: "right",
    },
    {
      id: 2,
      title: "Custom Design Options",
      description:
        "Your packaging should tell your brand’s unique story, and at Cheap Custom Packaging, we offer extensive customization to make that happen. From sizes and shapes to colors and finishes, our custom printed boxes bring your ideas to life. Whether you want vibrant colors on your custom boxes with a logo or eco-friendly options for custom packaging to meet your small business needs, our design options fit all. We specialize in custom shipping boxes and custom printed packaging that stands out on shelves. Choose from matte, gloss, foil stamping, die-cutting, and more to create beautiful and functional packaging that stands out. Our custom packaging service ensures your boxes are more than just containers. They are powerful tools that improve your brand and attract customers.",
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
            section.imagePosition === "left"
              ? "landingdes-image-left"
              : "landingdes-image-right"
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
