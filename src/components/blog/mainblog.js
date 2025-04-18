import React from "react";
import "./mainblog.css";
import { Button, Col, Row } from "antd";

// Sample blog data
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
  },
  {
    id: 4,
    title: "Spot UV: The Ultimate Guide",
    description:
      "Everything you need to know about spot UV finishing techniques for stunning packaging effects.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Emma Davis",
    date: "April 10, 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    popular: false,
  },
  {
    id: 5,
    title: "Spot UV: The Ultimate Guide",
    description:
      "Everything you need to know about spot UV finishing techniques for stunning packaging effects.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Emma Davis",
    date: "April 10, 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    popular: false,
  },
  {
    id: 6,
    title: "Spot UV: The Ultimate Guide",
    description:
      "Everything you need to know about spot UV finishing techniques for stunning packaging effects.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "Emma Davis",
    date: "April 10, 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    popular: false,
  },
  {
    id: 7,
    title: "Corrugated Cardboard Innovations",
    description:
      "Explore the latest advancements in corrugated cardboard technology for durable yet lightweight packaging.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    author: "James Wilson",
    date: "March 22, 2023",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    popular: true,
  },
];

function MainBlog() {
  const featuredBlog = blogs[0];
  const popularBlogs = blogs.filter((blog) => blog.popular);
  const otherBlogs = blogs.filter((blog) => !blog.popular && blog.id !== 1);

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

        {/* Two-column layout */}
        <div className="blog-grid">
          {/* Left Column - Main Content */}
          <div className="blog-main-content">
            {/* Featured Blog Card */}
            <div className="featured-blog-card">
              <div
                className="blog-card-image"
                style={{ backgroundImage: `url(${featuredBlog.image})` }}
              >
                <div className="image-overlay"></div>
              </div>
              <div className="blog-card-content">
                <h3 className="blog-card-title">{featuredBlog.title}</h3>
                <div className="blog-meta">
                  <img
                    src={featuredBlog.avatar}
                    alt={featuredBlog.author}
                    className="author-avatar"
                  />
                  <div>
                    <span className="author-name">{featuredBlog.author}</span>
                    <span className="post-date">{featuredBlog.date}</span>
                  </div>
                </div>
                <p className="blog-card-description">
                  {featuredBlog.description}
                </p>
                <div className="hover-read-more">READ MORE →</div>
              </div>
            </div>

            <Row gutter={[16, 16]}>
              {otherBlogs.map((blog) => (
                <Col xs={24} sm={12} lg={12} key={blog.id}>
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
                </Col>
              ))}
            </Row>
          </div>

          {/* Right Column - Popular Posts */}
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
          {" "}
          <Button className="getquote-button">Get a Quote</Button>
        </div>
      </div>
    </div>
  );
}

export default MainBlog;
