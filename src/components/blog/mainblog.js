import React, { useState, useEffect, useCallback } from "react";
import "./mainblog.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Col, Row, Alert, Input, notification } from "antd";
import { blog, blogcategory } from "../../utils/axios";
import SireprintingLoader from "../loader/loader";
import debounce from "lodash/debounce";

function MainBlog() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize search query from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const performSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        navigate(`/blog?query=${encodeURIComponent(query)}`, { replace: true });
      } else {
        navigate("/blog", { replace: true });
      }
    }, 500),
    [navigate]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [blogsResponse, categoriesResponse] = await Promise.all([
          blog.get("/"),
          blogcategory.get("/").catch(() => ({ data: { data: [] } })),
        ]);

        const blogData = Array.isArray(blogsResponse.data)
          ? blogsResponse.data.filter((blog) => blog.slug)
          : [];
        setBlogs(blogData);

        const responseData = Array.isArray(categoriesResponse?.data?.data)
          ? categoriesResponse.data.data
          : [];
        const categoryNames = responseData
          .map((cat) => cat?.name)
          .filter((name) => name);
        setCategories(["All", ...new Set(categoryNames)]);
      } catch (err) {
        setError(err.message || "Failed to fetch blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      notification.warning({
        message: "Search Error",
        description: "Please enter a search term",
      });
      return;
    }
    if (searchQuery.trim().length < 2) {
      notification.warning({
        message: "Search Error",
        description: "Search term must be at least 2 characters",
      });
      return;
    }
    setError(null);
    performSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      navigate("/blog", { replace: true });
    }
  };

  const filteredBlogs = searchQuery.trim()
    ? blogs.filter(
        (blog) =>
          blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog?.details?.[0]?.detailDescription
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          blog?.blogCategory?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : selectedCategory === "All"
    ? blogs
    : blogs.filter((blog) => blog?.blogCategory?.name === selectedCategory);

  const popularBlogs = blogs.filter((blog) => blog?.popular === true);

  if (loading) {
    return <SireprintingLoader />;
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
            wizards, featuring in-depth guides, custom packaging tips, and
            inspiring customer stories.
          </p>
        </div>

        <div className="blog-divider"></div>

        <div className="blog-search-container">
          <div className="blog-search-box">
            <Input
              placeholder="Search blogs..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <Button
              className="search-button"
              onClick={handleSearch}
              type="primary"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="blog-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab-button ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchQuery("");
                navigate("/blog");
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          <div className="blog-main-content">
            <Row gutter={[16, 16]}>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <Col xs={24} sm={12} lg={12} key={blog._id}>
                    <Link
                      to={`/blog/${blog.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="blog-card">
                        <div
                          className="blog-card-image"
                          style={{
                            backgroundImage: `url(${
                              blog.image || "/images/placeholder.png"
                            })`,
                          }}
                        >
                          <div className="image-overlay"></div>
                        </div>
                        <div className="blog-card-content">
                          <h3 className="blog-card-title">
                            {blog.title || "Untitled Blog"}
                          </h3>
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
                                {blog.createdAt
                                  ? new Date(
                                      blog.createdAt
                                    ).toLocaleDateString()
                                  : "Unknown Date"}
                              </span>
                            </div>
                          </div>
                          <p className="blog-card-description">
                            {blog.details?.[0]?.detailDescription ||
                              "No description available"}
                          </p>
                          <div className="hover-read-more">READ MORE →</div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Alert
                    message="No Blogs Found"
                    description={
                      searchQuery
                        ? `No blogs found for search "${searchQuery}"`
                        : `No blogs available for category "${selectedCategory}"`
                    }
                    type="info"
                    showIcon
                  />
                </Col>
              )}
            </Row>
          </div>

          <div className="blog-sidebar">
            <div className="popular-posts-sidebar">
              <h3 className="sidebar-title">Most Popular</h3>
              <div className="popular-posts-list">
                {popularBlogs.length > 0 ? (
                  popularBlogs.map((blog) => (
                    <div className="popular-post-card" key={blog._id}>
                      <Link
                        to={`/blog/${blog.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="popular-post-image"
                          style={{
                            backgroundImage: `url(${
                              blog.image || "/images/placeholder.png"
                            })`,
                          }}
                        ></div>
                        <div className="popular-post-content">
                          <h4 className="popular-post-title">
                            {blog.title || "Untitled Blog"}
                          </h4>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No popular blogs available</p>
                )}
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
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSearchQuery("");
                        navigate("/blog");
                      }}
                    >
                      {cat}
                      <span className="category-count">
                        {
                          blogs.filter((b) => b?.blogCategory?.name === cat)
                            .length
                        }
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlog;
