import React from 'react';
import './relatedblogs.css';

const blogPosts = [
  {
    title: "Top Packaging Trends of 2025",
    description: "Discover the latest innovations shaping the future of eco-friendly and custom packaging solutions.",
    image: "images/blog.png"
  },
  {
    title: "How to Choose the Right Box Size",
    description: "Tips and tricks to select the best box dimensions to reduce shipping costs and enhance unboxing experience.",
    image: "images/blog.png"
  },
  {
    title: "Benefits of Custom Printed Boxes",
    description: "Learn how custom-printed boxes boost brand recognition and customer loyalty.",
    image: "images/blog.png"
  }
];

function Relatedblogs() {
  return (
    <div className="relatedblog-section">
      <div className="div-trustedtext">
        {" "}
        <h2 className="trustedtext">Related Blog Posts</h2>
      </div>
      <div className="relatedblog-card-container">
        {blogPosts.map((blog, index) => (
          <div className="relatedblog-card" key={index}>
            <div className="relatedblog-image-wrapper">
              <img src={blog.image} alt={blog.title} className="relatedblog-image" />
            </div>
            <div className="relatedblog-content">
              <h3 className="relatedblog-title">{blog.title}</h3>
              <p className="relatedblog-description">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Relatedblogs;