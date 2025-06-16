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
    // Ensure all values have fallbacks to prevent undefined errors
    const catSlug = categorySlug || categoryTitle || "category";
    const subCatTitle = data?.title ? slugify(data.title) : "subcategory";
    const prodTitle = product?.title || product?.name || "product";
    // Get the first variant's title if available, otherwise use a fallback
    const variantTitle = product?.variants?.[0]?.variantTitle
      ? slugify(product.variants[0].variantTitle)
      : "default";

    console.log("Navigating with:", {
      categorySlug: catSlug,
      subCategoryTitle: subCatTitle,
      productTitle: prodTitle,
      variantTitle: variantTitle,
      productId: product._id,
    });

    // Navigate with variant title in the URL
    navigate(
      `/${catSlug}/${subCatTitle}/${slugify(prodTitle)}/${variantTitle}`,
      {
        state: {
          id: product._id,
          variantTitle: product?.variants?.[0]?.variantTitle,
        },
      }
    );
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
            src={data?.image}
            alt="Premium Packaging"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="allproduct-main">
        <Row className="allproduct-row" gutter={[24, 16]}>
          <Col xs={24} md={16} lg={16} className="allproduct-col1">
            <Row gutter="gutterRow">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <Col xs={12} sm={12} md={12} key={product._id}>
                    <div
                      className="product-card-wrapper"
                      // onMouseEnter={() => setHoveredProductName(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Card
                        className="allproduct-card"
                        hoverable
                        cover={
                          <div className="card-image-container">
                            <img
                              alt={product.title || product.name || "Product"}
                              src={
                                product.image || "../images/placeholder.webp"
                              }
                              className={`allproduct-card-image ${
                                product.hoverImage
                                  ? hoveredCard === index
                                    ? "fade-out"
                                    : "fade-in"
                                  : "fade-in"
                              }`}
                            />
                            {product.hoverImage && (
                              <img
                                alt={product.title || product.name || "Product"}
                                src={product.hoverImage}
                                className={`allproduct-card-image hover ${
                                  hoveredCard === index ? "fade-in" : "fade-out"
                                }`}
                              />
                            )}
                          </div>
                        }
                        onClick={() => handleClick(product)}
                      >
                        <Meta
                          title={
                            <span className="card-title">
                              {product.title || product.name || "Product"}
                            </span>
                          }
                          description={
                            <>
                              <p className="card-description">
                                {product.description ||
                                  "Premium packaging solution"}
                              </p>
                              <p className="card-price">
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
            md={10}
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
