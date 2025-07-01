import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spin, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import he from "he";
import Productform1 from "../productform/productform";
import { product, category } from "../../utils/axios";
import { slugify } from "../../utils/slugify";
import "./allproduct.css";

const { Meta } = Card;

function Allproduct1({ data }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const navigate = useNavigate();
  const { slug: categorySlug } = useParams();

  // Handle scroll effect for form
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch category title based on subcategory's category ID
  useEffect(() => {
    const fetchCategoryTitle = async () => {
      if (data?.categoryId) {
        try {
          const response = await category.get(`/${data.categoryId}`);
          setCategoryTitle(slugify(response.data.title || "category"));
        } catch (err) {
          console.error("Error fetching category title:", err);
          setCategoryTitle("category");
        }
      } else {
        console.warn("No categoryId found in data:", data);
        setCategoryTitle("category");
      }
    };

    fetchCategoryTitle();
  }, [data?.categoryId]);

  // Fetch products for the subcategory
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await product.get(`/subcategory/${data._id}`);
        console.log("Products response:", response.data);
        setProducts(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    console.log("Subcategory data:", data);
    if (data?._id) {
      fetchProducts();
    } else {
      console.warn("No subcategory ID found in data:", data);
      setLoading(false);
      setError("No subcategory data available");
    }
  }, [data?._id]);

  const handleClick = (product) => {
    // Use the full product slug if it exists
    if (product.slug) {
      navigate(`/${product.slug}`);
    }
    // Fallback to constructing the URL if slug doesn't exist
    else {
      const catSlug = categorySlug || "category";
      const subCatSlug = data?.slug || "subcategory";
      const productSlug = slugify(product?.title || product?.name) || "product";
      navigate(`/${catSlug}/${subCatSlug}/${productSlug}`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Empty description={error} />
      </div>
    );
  }

  const decodedDescription = he.decode(
    data?.description || "Explore our premium packaging solutions."
  );

  return (
    <div className="all-products-container">
      {/* Hero Section */}
      <div className="header-section">
        <div className="hero-content">
          <h1 className="hero-title">{data?.title || "Subcategory"}</h1>
          <div className="hero-divider"></div>
          <div className="hero-description">{parse(decodedDescription)}</div>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">✔️</span>
              <span>Customizable Options</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✔️</span>
              <span>Premium Materials</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✔️</span>
              <span>Brand Identity Focus</span>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            className="hero-image-sub"
            src={data?.pageImage || "../images/placeholder.webp"}
            alt={data?.title || "Premium Packaging"}
            onError={(e) => {
              e.target.src = "../images/placeholder.webp";
            }}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="allproduct-main">
        <Row className="allproduct-row" gutter={[24, 24]}>
          <Col xs={24} md={16} lg={16} className="allproduct-col1">
            <Row gutter={[16, 16]}>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <Col xs={24} sm={12} md={12} lg={12} key={product._id}>
                    <div
                      className="product-item-wrapper"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Card
                        className="product-item-card"
                        hoverable
                        cover={
                          <div className="product-image-container">
                            <img
                              alt={product.title || product.name || "Product"}
                              src={product.image || "/images/placeholder.webp"}
                              className={`product-item-image ${
                                product.hoverImage
                                  ? hoveredCard === index
                                    ? "fade-out"
                                    : "fade-in"
                                  : ""
                              }`}
                              onError={(e) => {
                                e.target.src = "/images/default-image.jpg";
                              }}
                            />
                            {product.hoverImage && (
                              <img
                                alt={product.title || product.name || "Product"}
                                src={
                                  product.hoverImage ||
                                  "/images/default-image.jpg"
                                }
                                className={`product-item-image hover ${
                                  hoveredCard === index ? "fade-in" : "fade-out"
                                }`}
                                onError={(e) => {
                                  e.target.src = "/images/default-image.jpg";
                                }}
                              />
                            )}
                          </div>
                        }
                        onClick={() => handleClick(product)}
                      >
                        <Meta
                          title={
                            <span className="product-item-title">
                              {product.title || product.name || "Product"}
                            </span>
                          }
                          description={
                            <>
                              <p className="product-item-description">
                                {he.decode(
                                  product.description ||
                                    "Premium packaging solution"
                                )}
                              </p>
                              <span
                                className="read-more"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClick(product);
                                }}
                              >
                                Read More
                              </span>
                              <p className="product-item-price">
                                {product.price
                                  ? `As low as: ${product.price}`
                                  : "Contact for pricing"}
                              </p>
                            </>
                          }
                        />
                      </Card>
                    </div>
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Empty description="No products available" />
                </Col>
              )}
            </Row>
          </Col>

          {/* Form Column */}
          <Col
            xs={24}
            md={8}
            lg={8}
            className={`form-column ${scrolled ? "scrolled-form" : ""}`}
          >
            <div className="sticky-form-container">
              <Productform1 />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Allproduct1;
