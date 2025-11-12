import React, { useState, useEffect } from "react";
import { Avatar, Button, Col, Row, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { blog, blogcategory, blogauthor } from "../../utils/axios";
import { slugify } from "../../utils/slugify";
import { useLocation } from "react-router-dom";
import "./blogauthor.css";
import "./mainblog.css";
import SireprintingLoader from "../loader/loader";

function Blogauthor() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState(null);
  const location = useLocation();
  const authorId = location.state?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch author details first
        if (authorId) {
          const authorResponse = await blogauthor.get(`/${authorId}`);
          setAuthor(authorResponse.data.data);
        } else {
          // Fallback to fetching all authors if no ID (original behavior)
          const authorResponse = await blogauthor.get("/");
          const authorData = Array.isArray(authorResponse.data)
            ? authorResponse.data[0]
            : authorResponse.data;
          setAuthor(authorData);
        }

        // Fetch blogs
        const blogsResponse = await blog.get(`/byauthor/${authorId}`);
        setBlogs(blogsResponse.data);

        // Fetch categories
        try {
          const categoriesResponse = await blogcategory.get("/");
          console.log(categoriesResponse, "cat res");
          const responseData = categoriesResponse?.data?.data || [];
          const categoryNames = Array.isArray(responseData)
            ? responseData.map((cat) => cat?.name).filter(Boolean)
            : [];
          setCategories(["All", ...new Set(categoryNames)]);
        } catch (categoriesError) {
          console.error("Failed to fetch categories:", categoriesError);
          setCategories(["All"]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs = (
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.blogCategory?.name === selectedCategory)
  ).filter((blog) => !authorId || blog.blogAuthor?._id === authorId);

  const popularBlogs = blogs.filter((blog) => blog.popular);

  if (loading) {
    return (
      <div className="main-blog-container">
        {/* <SireprintingLoader /> */}
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
    <div>
      {/* Author Section */}
      {author && (
        <div className="author-container">
          <div className="author-content">
            <div>
              <Avatar
                src={author.image}
                size={150}
                style={{
                  border: "4px solid #e76f51",
                  backgroundColor: "#fff",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              />
            </div>

            <div className="author-text">
              <h2 className="author-nameauth">{author.name}</h2>
              <h2 className="author-title">Author</h2>
              <div className="author-bio">
                <p>{author.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Section */}
      <div className="main-blog-container">
        <div className="blog-content-wrapper">
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
          {/* <div className="blog-category-tabs">
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
          </div> */}

          {/* Two-column layout */}
          <div className="blog-grid">
            {/* Left Column */}
            <div className="blog-main-content">
              <Row gutter={[16, 16]}>
                {filteredBlogs.map((blogItem) => (
                  <Col xs={24} sm={12} lg={12} key={blogItem._id}>
                    <Link
                      to={`/blog/${slugify(blogItem.title)}`}
                      state={{ id: blogItem._id }}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="blog-card">
                        <div
                          className="blog-card-image"
                          style={{ backgroundImage: `url(${blogItem.image})` }}
                        >
                          <div className="image-overlay"></div>
                        </div>
                        <div className="blog-card-content">
                          <h3 className="blog-card-title">{blogItem.title}</h3>
                          <div className="blog-meta">
                            <img
                              src={
                                blogItem.blogAuthor?.avatar ||
                                "https://randomuser.me/api/portraits/women/44.jpg"
                              }
                              alt={blogItem.blogAuthor?.name || "Author"}
                              className="author-avatar"
                            />
                            <div>
                              <span className="author-name">
                                {blogItem.blogAuthor?.name || "Unknown Author"}
                              </span>
                              <span className="post-date">
                                {new Date(
                                  blogItem.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          <p className="blog-card-description">
                            {blogItem.details[0]?.detailDescription ||
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

            {/* Right Column - Popular Posts and Sidebar */}
            <div>
              <div className="popular-posts-sidebar">
                <h3 className="sidebar-title">Most Popular</h3>
                <div className="popular-posts-list">
                  {popularBlogs.map((blogItem) => (
                    <div className="popular-post-card" key={blogItem._id}>
                      <Link
                        to={`/blog/${slugify(blogItem.title)}`}
                        state={{ id: blogItem._id }}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="popular-post-image"
                          style={{ backgroundImage: `url(${blogItem.image})` }}
                        ></div>
                        <div className="popular-post-content">
                          <h4 className="popular-post-title">
                            {blogItem.title}
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
                  src={`${process.env.PUBLIC_URL}/images/blog_banner.png`}
                  alt="Banner"
                  className="side-banner"
                />
                <Link to="/get-a-quote" className="get-quote-button">
                  Get a Quote
                </Link>
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
    </div>
  );
}

export default Blogauthor;
