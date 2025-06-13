import React, { useState, useEffect } from "react";
import "./blog.css";
import { Link } from "react-router-dom";
import { Col, Row, Carousel, Spin, Alert } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { blog } from "../../utils/axios";
import { slugify } from "../../utils/slugify";
import SireprintingLoader from "../loader/loader";

// Sample carousel items
const carouselItems = [
  {
    id: 1,
    title: "Mailer Box",
    image: "/images/arka.png",
  },
  {
    id: 2,
    title: "Window Box",
    image: "/images/arka.png",
  },
  {
    id: 3,
    title: "Corrugated Box",
    image: "/images/arka.png",
  },
];

function MainBlogRedesign() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fallbackId = location.state?.id;
  const [blogContent, setBlogContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;

        // First try to fetch by ID if available
        if (fallbackId) {
          response = await blog.get(`/${fallbackId}`);
        }
        // Then try by slug
        else {
          try {
            response = await blog.get(`/slug/${slug}`);
          } catch (slugError) {
            // If slug fails and looks like ID, try as ID
            if (/^[0-9a-fA-F]{24}$/.test(slug)) {
              response = await blog.get(`/${slug}`);
            } else {
              throw slugError;
            }
          }
        }

        if (!response?.data) {
          throw new Error("Blog post not found");
        }

        const data = response.data;
        setBlogContent(data);

        // Verify URL matches the actual blog slug
        const expectedSlug = slugify(data.title);
        if (slug !== expectedSlug) {
          navigate(`/blog/${expectedSlug}`, {
            state: { id: data._id },
            replace: true,
          });
        }
      } catch (err) {
        setError(err.message || "Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, fallbackId, navigate]);

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
      {/* Social Media Icons Column */}
      <div className="social-icons-column">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaFacebookF style={{ fontSize: "25px" }} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <TwitterOutlined style={{ fontSize: "25px" }} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedinIn style={{ fontSize: "25px" }} />
        </a>
      </div>

      {/* Top Section */}
      <Row gutter={[24, 24]} align="middle" className="top-section">
        <Col xs={24} md={12}>
          <h1 className="blog-title">{blogContent.title}</h1>
          <p className="blog-description">
            {blogContent.details[0]?.detailDescription ||
              "No description available"}
          </p>
          <div className="author-info">
            <Link
              to="/blog-author"
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
            <span style={{ marginLeft: "0.5rem" }} className="post-date">
              {new Date(blogContent.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <img src={blogContent.image} className="main-image" alt="Main blog" />
        </Col>
      </Row>

      {/* Second Section */}
      <Row gutter={[24, 24]} className="second-section">
        <Col xs={24} md={16}>
          <div className="blog-body">
            {blogContent.details?.map((detail, index) => (
              <React.Fragment key={index}>
                {detail.detailTitle && <h2>{detail.detailTitle}</h2>}
                <p>{detail.detailDescription}</p>
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
            slidesToShow={Math.min(5, carouselItems.length)}
            autoplay
            className="product-carousel"
          >
            {carouselItems.map((item) => (
              <div className="carousel-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="carousel-img"
                />
                <div className="carousel-title">{item.title}</div>
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
            <a href="/get-a-quote" className="get-quote-button">
              Get a Quote
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MainBlogRedesign;
