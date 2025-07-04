import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { DownOutlined, DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "./diecategory.css";
import Faq1 from "../landing/faq";
import Banner from "../landing/banner";
import Sireadvantage from "../landing/sireadvantage";
import { subcategory, category, product } from "../../utils/axios";
import { slugify } from "../../utils/slugify";
import he from "he";
import SireprintingLoader from "../loader/loader";

function Diecategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch categories, subcategories and products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First fetch all categories
        const categoriesResponse = await category.get("/");
        const allCategories = categoriesResponse.data;

        // Find Packaging Styles category
        const packagingStylesCategory = allCategories.find(
          (cat) => slugify(cat.title) === slugify("Packaging Styles")
        );

        if (packagingStylesCategory) {
          setCategories([packagingStylesCategory]);

          // Fetch subcategories
          const subCategoriesResponse = await subcategory.get(
            `/category/${packagingStylesCategory._id}`
          );
          setSubCategories(subCategoriesResponse.data);

          // Set first subcategory as selected by default and fetch its products
          if (subCategoriesResponse.data.length > 0) {
            const firstSubCat = subCategoriesResponse.data[0];
            setSelectedCategory(firstSubCat._id);
            await fetchProducts(firstSubCat._id);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProducts = async (subCategoryId) => {
    try {
      const productsResponse = await product.get(
        `/subcategory/${subCategoryId}`
      );
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    await fetchProducts(categoryId);
  };

  const handleDownloadPDF = async (pdfUrl, productName) => {
    try {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${slugify(productName)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF");
    }
  };

  if (loading) {
    return <SireprintingLoader />;
  }

  return (
    <div>
      <div style={{ marginTop: "5rem" }}>
        <Row className="subcategory-products">
          <Col xs={24} md={6} className="category-column">
            {!isMobile ? (
              <>
                <p className="subcategory-heading1">
                  Packaging Styles <div className="divider1"></div>
                </p>
                <div className="category-grid-container">
                  {subCategories.map((subCat) => (
                    <div
                      key={subCat._id}
                      className={`category-card ${
                        selectedCategory === subCat._id ? "active-category" : ""
                      }`}
                      onClick={() => handleCategoryClick(subCat._id)}
                    >
                      <div className="category-card-content">
                        <div className="category-text">
                          <h3 className="category-name">{subCat.title}</h3>
                        </div>
                        <div className="category-image-container">
                          <img
                            src={subCat.image || "../images/arka.png"}
                            alt={subCat.title}
                            className="category-image"
                            onError={(e) =>
                              (e.target.src = "../images/arka.png")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mobile-accordion">
                <p className="subcategory-heading1">Packaging Styles</p>
                {subCategories.map((subCat) => (
                  <div key={subCat._id} className="mobile-category">
                    <div
                      className="mobile-category-header"
                      onClick={() => handleCategoryClick(subCat._id)}
                    >
                      <span>{subCat.title}</span>
                      <DownOutlined
                        className={`dropdown-arrow ${
                          selectedCategory === subCat._id ? "rotated" : ""
                        }`}
                      />
                    </div>
                    {selectedCategory === subCat._id && (
                      <div className="mobile-category-products">
                        <Row gutter={[16, 16]}>
                          {products.map((prod) => (
                            <Col xs={24} key={prod._id}>
                              <div className="product-card-with-pdf">
                                <div className="pdf-preview-container">
                                  {prod.pdfImage ? (
                                    <img
                                      src={prod.pdfImage}
                                      alt={`${prod.title} PDF Preview`}
                                      className="pdf-preview-image"
                                      onError={(e) => {
                                        e.target.src = "../images/arka.png";
                                      }}
                                    />
                                  ) : (
                                    <div className="pdf-placeholder">
                                      No PDF Available
                                    </div>
                                  )}
                                </div>
                                <div className="product-info">
                                  <h3>{prod.title}</h3>
                                  <Button
                                    type="primary"
                                    icon={<DownloadOutlined />}
                                    onClick={() =>
                                      handleDownloadPDF(
                                        prod.pdfImage,
                                        prod.title
                                      )
                                    }
                                    disabled={!prod.pdfImage}
                                  >
                                    Download PDF
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Col>

          {/* Desktop Products */}
          {!isMobile && selectedCategory && (
            <Col xs={24} sm={24} md={16}>
              <p
                className="subcategory-heading1"
                style={{ fontWeight: "bold" }}
              >
                {subCategories.find((c) => c._id === selectedCategory)?.title ||
                  "Products"}
                <div className="divider1"></div>
              </p>
              <Row gutter={[16, 16]}>
                {products.map((prod) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={prod._id}>
                    <div className="product-card-with-pdf">
                      <div className="pdf-preview-container">
                        {prod.pdfImage ? (
                          <img
                            src={prod.pdfImage}
                            alt={`${prod.title} PDF Preview`}
                            className="pdf-preview-image"
                            onError={(e) => {
                              e.target.src = "../images/arka.png";
                            }}
                          />
                        ) : (
                          <div className="pdf-placeholder">
                            No PDF Available
                          </div>
                        )}
                      </div>
                      <div className="product-info">
                        <h3>{prod.title}</h3>
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          onClick={() =>
                            handleDownloadPDF(prod.pdfImage, prod.title)
                          }
                          disabled={!prod.pdfImage}
                          block
                        >
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </div>
      <Banner />
      <Sireadvantage />
      <Faq1 />
    </div>
  );
}

export default Diecategory;
