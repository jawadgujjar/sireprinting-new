import React, { useState, useEffect } from "react";
import "./blog.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Col, Row, Carousel, Spin, Alert } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { blog, product } from "../../utils/axios";
import SireprintingLoader from "../loader/loader";

function MainBlogRedesign() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogContent, setBlogContent] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch blog by slug
        const response = await blog.get(`/${slug}`);

        if (!response?.data) {
          throw new Error("Blog post not found");
        }

        const data = response.data;
        setBlogContent(data);

        // Fetch related products
        try {
          const productResponse = await product.get(
            data.blogCategory ? `/category/${data.blogCategory._id}` : "/"
          );
          setRelatedProducts(productResponse.data.slice(0, 5) || []);
        } catch (productError) {
          console.error("Failed to fetch related products:", productError);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="blog-redesign-container">
        <SireprintingLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-redesign-container">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!blogContent) {
    return (
      <div className="blog-redesign-container">
        <Alert
          message="Not Found"
          description="The requested blog post could not be found"
          type="warning"
          showIcon
        />
      </div>
    );
  }

  const currentUrl = window.location.href;
  const text = blogContent?.title || "Check out this blog post!";

  return (
    <div className="blog-redesign-container">
      <div className="social-icons-column">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaFacebookF style={{ fontSize: "25px" }} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl
          )}&text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <TwitterOutlined style={{ fontSize: "25px" }} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedinIn style={{ fontSize: "25px" }} />
        </a>
      </div>

      <Row gutter={[24, 24]} align="middle" className="top-section">
        <Col xs={24} md={12}>
          <h1 className="blog-title">{blogContent.title || "Untitled Blog"}</h1>
          <p className="blog-description">
            {blogContent.details?.[0]?.detailDescription ||
              "No description available"}
          </p>
          <div className="author-info">
            <Link
              to={`/blog-author/${blogContent.blogAuthor?._id || ""}`}
              state={{ id: blogContent.blogAuthor?._id }}
              className="author-link"
            >
              <img
                src={
                  blogContent.blogAuthor?.avatar ||
                  "https://randomuser.me/api/portraits/women/44.jpg"
                }
                alt={blogContent.blogAuthor?.name || "Author"}
                className="author-avatar"
              />
              <span className="author-name">
                {blogContent.blogAuthor?.name || "Unknown Author"}
              </span>
            </Link>
            <span className="post-date">
              {new Date(blogContent.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <img
            src={blogContent.image || "/images/placeholder.png"}
            className="main-image"
            alt={blogContent.title || "Blog image"}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="second-section">
        <Col xs={24} md={16}>
          <div className="blog-body">
            {blogContent.details?.map((detail, index) => (
              <React.Fragment key={index}>
                {detail.detailTitle && <h2>{detail.detailTitle}</h2>}
                <p>{detail.detailDescription || "No content available"}</p>
                {detail.table && detail.table.length > 0 && (
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        {Object.keys(detail.table[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {detail.table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </React.Fragment>
            ))}
          </div>
          <h3 className="carousel-heading">Related Products</h3>
          <Carousel
            dots={false}
            slidesToShow={Math.min(5, relatedProducts.length)}
            autoplay
            className="product-carousel"
          >
            {relatedProducts.map((item) => (
              <div className="carousel-item" key={item._id}>
                <Link to={`/product/${item.slug}`}>
                  <img
                    src={item.images?.[0] || "/images/placeholder.png"}
                    alt={item.title || "Product"}
                    className="carousel-img"
                  />
                  <div className="carousel-title">
                    {item.title || "Untitled Product"}
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        </Col>
        <Col xs={24} md={8}>
          <div className="side-banner-container">
            <img
              src="../images/blog_banner.png"
              alt="Banner"
              className="side-banner"
            />
            <Link to="/get-a-quote" className="get-quote-button">
              Get a Quote
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MainBlogRedesign;
