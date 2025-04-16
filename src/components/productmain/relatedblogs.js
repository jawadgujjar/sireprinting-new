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
    <div className="related-blog-section">
      <h2 className="blog-heading">Related Blog Posts</h2>
      <div className="blog-card-container">
        {blogPosts.map((blog, index) => (
          <div className="blog-card" key={index}>
            <div className="blog-image-wrapper">
              <img src={blog.image} alt={blog.title} className="blog-image" />
            </div>
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Relatedblogs;
