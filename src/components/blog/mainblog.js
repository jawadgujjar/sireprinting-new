import React, { useState, useEffect } from "react";
import "./mainblog.css";
import { Link } from "react-router-dom";
import { Button, Col, Row, Spin, Alert } from "antd";
import { blog, blogcategory } from "../../utils/axios";
import { slugify } from "../../utils/slugify";

function MainBlog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]); // Initialize with "All"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch blogs
        const blogsResponse = await blog.get("/");
        setBlogs(blogsResponse.data);

        // Fetch categories with error handling
        try {
          const categoriesResponse = await blogcategory.get("/");

          // Access the nested data property
          const responseData = categoriesResponse?.data?.data || [];

          // Ensure we have an array and extract names safely
          const categoryNames = Array.isArray(responseData)
            ? responseData.map((cat) => cat?.name).filter((name) => name)
            : [];

          setCategories(["All", ...new Set(categoryNames)]); // Remove duplicates
        } catch (categoriesError) {
          console.error("Failed to fetch categories:", categoriesError);
          // Continue with just "All" category
        }
      } catch (err) {
        setError(err.message || "Failed to fetch blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.blogCategory?.name === selectedCategory);

  const popularBlogs = blogs.filter((blog) => blog.popular);

  if (loading) {
    return (
      <div className="main-blog-container">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-blog-container">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

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
                <Col xs={24} sm={12} lg={12} key={blog._id}>
                  <Link
                    to={`/blog/${slugify(blog.title)}`}
                    state={{ id: blog._id }}
                    style={{ textDecoration: "none" }}
                  >
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
                            src={
                              blog.blogAuthor?.avatar ||
                              "https://randomuser.me/api/portraits/women/44.jpg"
                            }
                            alt={blog.blogAuthor?.name || "Author"}
                            className="author-avatar"
                          />
                          <div>
                            <span className="author-name">
                              {blog.blogAuthor?.name || "Unknown Author"}
                            </span>
                            <span className="post-date">
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        <p className="blog-card-description">
                          {blog.details[0]?.detailDescription ||
                            "No description available"}
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
                  <div className="popular-post-card" key={blog._id}>
                    <Link
                      to={`/blog/${slugify(blog.title)}`}
                      state={{ id: blog._id }}
                      style={{ textDecoration: "none" }}
                    >
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
                    </Link>
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
                        {
                          blogs.filter((b) => b.blogCategory?.name === cat)
                            .length
                        }
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
