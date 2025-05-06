import React, { useState } from "react";
import "./mainblog.css";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";

const categories = [
  "All",
  "Featured",
  "Step-By-Step Guides",
  "Retail Packaging",
  "Box Customization",
  "Packaging Glossary",
  "Inspiration",
];

const blogs = [
  {
    id: 1,
    title: "The Art of Sustainable Packaging",
    description:
      "Discover how eco-friendly materials are revolutionizing the packaging industry and how you can implement these solutions.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Sarah Johnson",
    date: "May 15, 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    popular: true,
    category: "Featured",
  },
  {
    id: 2,
    title: "Mastering Die-Cut Techniques",
    description:
      "Learn professional die-cutting methods that will elevate your packaging designs to premium quality standards.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Michael Chen",
    date: "April 28, 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    popular: true,
    category: "Step-By-Step Guides",
  },
  {
    id: 3,
    title: "Spot UV: The Ultimate Guide",
    description:
      "Everything you need to know about spot UV finishing techniques for stunning packaging effects.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Emma Davis",
    date: "April 10, 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    popular: false,
    category: "Retail Packaging",
  },
  {
    id: 4,
    title: "Corrugated Cardboard Innovations",
    description:
      "Explore the latest advancements in corrugated cardboard technology for durable yet lightweight packaging.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "James Wilson",
    date: "March 22, 2023",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    popular: true,
    category: "Box Customization",
  },
  {
    id: 5,
    title: "Glossary of Packaging Terms",
    description:
      "Understand key packaging terms and industry lingo with our easy-to-navigate glossary.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Lily Smith",
    date: "February 14, 2023",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
    popular: false,
    category: "Packaging Glossary",
  },
  {
    id: 6,
    title: "Creative Packaging Inspiration",
    description:
      "Be inspired by creative packaging from brands around the world.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Brian Lee",
    date: "January 30, 2023",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    popular: false,
    category: "Inspiration",
  },
];

function MainBlog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const featuredBlog = blogs[0];
  const popularBlogs = blogs.filter((blog) => blog.popular);

  return (
    <div className="main-blog-container">
      <div className="blog-background-pattern"></div>
      <div className="blog-content-wrapper">
        <div className="blog-header">
          <h1 className="blog-title">BLOG</h1>
          <h2 className="blog-subtitle">Behind the Box</h2>
        </div>

        <div className="blog-content">
          <p className="blog-description">
            Unpack expert insights with a range of content from our packaging
            wizards, featuring in-depth guides, custom packaging tips and
            inspiring customer stories.
          </p>
        </div>

        <div className="blog-divider"></div>

        {/* Search */}
        <div className="blog-search-container">
          <div className="blog-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search ..."
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="blog-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab-button ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="blog-grid">
          {/* Left Column */}
          <div className="blog-main-content">
            <Row gutter={[16, 16]}>
              {filteredBlogs.map((blog) => (
                <Col xs={24} sm={12} lg={12} key={blog.id}>

                  <Link to={`/blog1`} style={{ textDecoration: "none" }}>
                    <div className="blog-card">
                      <div
                        className="blog-card-image"
                        style={{ backgroundImage: `url(${blog.image})` }}
                      >
                        <div className="image-overlay"></div>
                      </div>
                      <div className="blog-card-content">
                        <h3 className="blog-card-title">{blog.title}</h3>
                        <div className="blog-meta">
                          <img
                            src={blog.avatar}
                            alt={blog.author}
                            className="author-avatar"
                          />
                          <div>
                            <span className="author-name">{blog.author}</span>
                            <span className="post-date">{blog.date}</span>
                          </div>
                        </div>
                        <p className="blog-card-description">
                          {blog.description}
                        </p>
                        <div className="hover-read-more">READ MORE →</div>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>

          {/* Right Column - Popular Posts */}
          <div>
            <div className="popular-posts-sidebar">
              <h3 className="sidebar-title">Most Popular</h3>
              <div className="popular-posts-list">
                {popularBlogs.map((blog) => (
                  <div className="popular-post-card" key={blog.id}>
                    <div
                      className="popular-post-image"
                      style={{ backgroundImage: `url(${blog.image})` }}
                    ></div>
                    <div className="popular-post-content">
                      <h4
                        className="popular-post-title"
                        style={{ color: "black" }}
                      >
                        {blog.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="featured-categories">
              <h3 className="sidebar-title">Featured Categories:</h3>
              <div className="category-box">
                {categories
                  .filter((cat) => cat !== "All")
                  .map((cat) => (
                    <button
                      key={cat}
                      className={`sidebar-category-button ${
                        selectedCategory === cat ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                      <span className="category-count">
                        {blogs.filter((b) => b.category === cat).length}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
            <div className="follow-us-section">
              <p className="follow-us-title">Follow us:</p>
              <div className="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
                    alt="Facebook"
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    alt="Instagram"
                  />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/145/145812.png"
                    alt="Twitter"
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                    alt="LinkedIn"
                  />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                    alt="YouTube"
                  />
                </a>
              </div>
            </div>
            <div className="side-banner-container">
              <img
                src="../images/blog_banner.png"
                alt="Banner"
                className="side-banner"
              />
              <a href="/get-a-quote" className="get-quote-button">
                Get a Quote
              </a>
            </div>
          </div>
        </div>

        <div className="div-getquote-blog">
          <h2 className="testimonials-main-sec">
            Ready to think outside the box? Let's get started!
          </h2>
          <h4>
            Get in touch with a custom packaging specialist now for a free
            consultation and instant price quote.
          </h4>
          <div className="getbutton-center">
            <Link to="/get-a-quote">
              <Button className="getquote-button">Get a Quote</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlog;
