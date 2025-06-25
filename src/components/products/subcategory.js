import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spin, Empty, Alert } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { subcategory, product, category } from "../../utils/axios";
import { slugify } from "../../utils/slugify";
import "./subcategory.css";

// Local fallback image
const fallbackImage = "https://sireprinting.com/img/brand/Sire-Printing.png";

const { Meta } = Card;

function Subcategory({ data }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [categoryTitle, setCategoryTitle] = useState("");
  const { slug: categorySlug } = useParams(); // Get category slug from URL

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch category title based on category ID
  useEffect(() => {
    const fetchCategoryTitle = async () => {
      if (data?._id) {
        try {
          const response = await category.get(`/${data._id}`);
          setCategoryTitle(slugify(response.data.title));
        } catch (err) {
          console.error("Error fetching category title:", err);
        }
      }
    };

    fetchCategoryTitle();
  }, [data?._id]);

  // Fetch subcategories when component mounts or categoryId changes
  useEffect(() => {
    if (data?._id) {
      fetchSubCategories(data._id);
    }
  }, [data?._id]);

  // Fetch products when selected subcategory changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchSubCategories = async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await subcategory.get(`/category/${categoryId}`);
      setSubCategories(response.data);
      // Auto-select first subcategory if available
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0]._id);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch subcategories");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (subCategoryId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await product.get(`/subcategory/${subCategoryId}`);
      setProducts(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (subCategoryId) => {
    setSelectedCategory(
      subCategoryId === selectedCategory ? null : subCategoryId
    );
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
    e.target.onerror = null; // Prevent infinite loop if fallback fails
  };

  if (loading && !subCategories.length) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      <Row className="subcategory-products">
        <Col xs={24} md={6}>
          <p className="subcategory-heading1">
            Sub-Categories <div className="divider1"></div>
          </p>
          <div className="category-column">
            {!isMobile ? (
              <>
                <div className="category-grid-container">
                  {subCategories.map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className={`category-card ${
                        selectedCategory === subCategory._id
                          ? "active-category"
                          : ""  
                      }`}
                      onClick={() => handleCategoryClick(subCategory._id)}
                    >
                      <div className="category-card-content">
                        <div className="category-text">
                          <h3 className="category-name">{subCategory.title}</h3>
                        </div>
                        <div className="category-image-container">
                          <img
                            src={subCategory.image || fallbackImage}
                            alt={subCategory.title}
                            className="category-image"
                            onError={handleImageError}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mobile-accordion">
                <p className="subcategory-heading1">Sub-Categories</p>
                {subCategories.map((subCategory) => (
                  <div key={subCategory._id} className="mobile-category">
                    <div
                      className="mobile-category-header"
                      onClick={() => handleCategoryClick(subCategory._id)}
                    >
                      <span>{subCategory.title}</span>
                      <DownOutlined
                        className={`dropdown-arrow ${
                          selectedCategory === subCategory._id ? "rotated" : ""
                        }`}
                      />
                    </div>
                    {selectedCategory === subCategory._id && (
                      <div className="mobile-category-products">
                        <Row gutter={[16, 16]}>
                          {products.length > 0 ? (
                            products.map((product) => (
                              <Col xs={24} key={product._id}>
                                <Link
                                  to={`/${
                                    categorySlug || categoryTitle
                                  }/${slugify(subCategory.title)}/${slugify(
                                    product.title
                                  )}/${
                                    product.variants?.[0]?.variantTitle
                                      ? slugify(
                                          product.variants[0].variantTitle
                                        )
                                      : "default"
                                  }`}
                                  state={{
                                    id: product._id,
                                    variantTitle:
                                      product.variants?.[0]?.variantTitle,
                                  }}
                                  className="product-link"
                                >
                                  <Card
                                    hoverable
                                    cover={
                                      <img
                                        alt={product.title}
                                        src={product.image || fallbackImage}
                                        onError={handleImageError}
                                      />
                                    }
                                    className="product-card"
                                    bodyStyle={{
                                      padding: "10px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <div className="product-title">
                                      {product.title}
                                    </div>
                                  </Card>
                                </Link>
                              </Col>
                            ))
                          ) : (
                            <Col span={24}>
                              <Empty description="No products found" />
                            </Col>
                          )}
                        </Row>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>

        {/* Right Column: Products for Desktop */}
        {!isMobile && (
          <Col xs={24} sm={24} md={14}>
            <p className="subcategory-heading1" style={{ fontWeight: "bold" }}>
              {subCategories.find((c) => c._id === selectedCategory)?.title ||
                "Products"}
              <div className="divider1"></div>
            </p>
            <Row gutter={[16, 16]}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Col xs={24} sm={8} md={8} lg={8} key={product._id}>
                    <Link
                      to={`/${categorySlug || categoryTitle}/${slugify(
                        subCategories.find((c) => c._id === selectedCategory)
                          ?.title
                      )}/${slugify(product.title)}/${
                        product.variants?.[0]?.variantTitle
                          ? slugify(product.variants[0].variantTitle)
                          : "default"
                      }`}
                      state={{
                        id: product._id,
                        variantTitle: product.variants?.[0]?.variantTitle,
                      }}
                      className="product-link"
                    >
                      <Card
                        className="allproduct-card"
                        hoverable
                        cover={
                          <div className="card-image-container">
                            <img
                              alt={product.title}
                              src={product.image || fallbackImage}
                              className="allproduct-card-image"
                              onError={handleImageError}
                            />
                          </div>
                        }
                      >
                        <Meta
                          title={
                            <span className="card-title">{product.title}</span>
                          }
                        />
                      </Card>
                    </Link>
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Empty description="No products found" />
                </Col>
              )}
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Subcategory;
