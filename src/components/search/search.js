import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Card, Input, Button, Spin, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./search.css";
import Productform1 from "../productform/productform";
import { category, product, subcategory } from "../../utils/axios";
import debounce from "lodash/debounce";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState({
    categories: [],
    subcategories: [],
    products: [],
  });
  const [searchResults, setSearchResults] = useState({
    categories: [],
    subcategories: [],
    products: [],
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query), 300),
    [allData, performSearch]
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, subcategoriesRes, productsRes] =
          await Promise.all([
            category.get("/"),
            subcategory.get("/"),
            product.get("/"),
          ]);

        setAllData({
          categories: categoriesRes.data || [],
          subcategories: subcategoriesRes.data || [],
          products: productsRes.data || [],
        });
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message: "Data Load Error",
          description: "Failed to load data for search",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setSearchQuery(query);
    if (query && dataLoaded) {
      debouncedSearch(query);
    } else {
      setSearchResults({ categories: [], subcategories: [], products: [] });
      setHasSearched(false);
    }
  }, [location.search, dataLoaded, debouncedSearch]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults({ categories: [], subcategories: [], products: [] });
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const searchTerm = query.toLowerCase();

      const categoryResults = allData.categories.filter((category) =>
        category?.title?.toLowerCase()?.includes(searchTerm)
      );

      const subcategoryResults = allData.subcategories.filter(
        (subcategory) =>
          subcategory?.title?.toLowerCase()?.includes(searchTerm) ||
          (subcategory?.description &&
            subcategory.description.toLowerCase().includes(searchTerm))
      );

      const productResults = allData.products.filter(
        (product) =>
          product?.title?.toLowerCase()?.includes(searchTerm) ||
          (product?.description &&
            product.description.toLowerCase().includes(searchTerm)) ||
          (product?.shortDescription &&
            product.shortDescription.toLowerCase().includes(searchTerm)) ||
          (product?.tags &&
            Array.isArray(product.tags) &&
            product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
      );

      setSearchResults({
        categories: categoryResults,
        subcategories: subcategoryResults,
        products: productResults,
      });
    } catch (error) {
      console.error("Search error:", error);
      notification.error({
        message: "Search Error",
        description: "Failed to perform search",
      });
    } finally {
      setLoading(false);
    }
  };

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

    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    debouncedSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Row className="search-form-wrapper">
        <Col xs={24} md={12}>
          <div className="searchbox">
            <div className="search-box-elite">
              <h2 className="search-title">Search Products</h2>
              <Input
                placeholder="Enter product name..."
                size="large"
                className="search-input-1"
                suffix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Search products"
              />
              <Button
                type="primary"
                className="search-button"
                onClick={handleSearch}
                loading={loading}
              >
                Search
              </Button>

              {hasSearched && (
                <div className="search-results-container">
                  {loading ? (
                    <div className="search-loading">
                      <Spin size="large" />
                    </div>
                  ) : (
                    <>
                      {searchResults.categories.length > 0 && (
                        <div className="results-section">
                          <h3>
                            Categories ({searchResults.categories.length})
                          </h3>
                          <Row gutter={[16, 16]}>
                            {searchResults.categories.map((category) => (
                              <Col xs={24} sm={12} md={8} key={category?._id}>
                                <Card
                                  hoverable
                                  className="search-card"
                                  onClick={() => navigate(`/${category.slug}`)}
                                  cover={
                                    category.image ? (
                                      <img
                                        alt={category.title || "Category Image"}
                                        src={category.image}
                                        className="card-image"
                                      />
                                    ) : (
                                      <div className="no-image-placeholder">
                                        No Image
                                      </div>
                                    )
                                  }
                                >
                                  <h4>
                                    {category.title || "Untitled Category"}
                                  </h4>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                      {searchResults.subcategories.length > 0 && (
                        <div className="results-section">
                          <h3>
                            Subcategories ({searchResults.subcategories.length})
                          </h3>
                          <Row gutter={[16, 16]}>
                            {searchResults.subcategories.map((subcat) => (
                              <Col xs={24} sm={12} md={8} key={subcat?._id}>
                                <Card
                                  hoverable
                                  className="search-card"
                                  onClick={() =>
                                    navigate(
                                      subcat.category
                                        ? `/${subcat.category.slug}/${subcat.slug}`
                                        : `/${subcat.slug}`
                                    )
                                  }
                                  cover={
                                    subcat.image ? (
                                      <img
                                        alt={
                                          subcat.title || "Subcategory Image"
                                        }
                                        src={subcat.image}
                                        className="card-image"
                                      />
                                    ) : (
                                      <div className="no-image-placeholder">
                                        No Image
                                      </div>
                                    )
                                  }
                                >
                                  <h4>
                                    {subcat.title || "Untitled Subcategory"}
                                  </h4>
                                  {subcat.category && (
                                    <p>Under: {subcat.category.title}</p>
                                  )}
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                      {searchResults.products.length > 0 && (
                        <div className="results-section">
                          <h3>Products ({searchResults.products.length})</h3>
                          <Row gutter={[16, 16]}>
                            {searchResults.products.map((product) => (
                              <Col xs={24} sm={12} md={8} key={product?._id}>
                                <Card
                                  hoverable
                                  className="search-card"
                                  onClick={() => {
                                    const path = product.category?.slug
                                      ? product.subCategory?.slug
                                        ? `/${product.category.slug}/${product.subCategory.slug}/${product.slug}`
                                        : `/${product.category.slug}/${product.slug}`
                                      : `/${product.slug}`;
                                    navigate(path);
                                  }}
                                  cover={
                                    product.image ? (
                                      <img
                                        alt={product.title || "Product Image"}
                                        src={product.image}
                                        className="card-image"
                                      />
                                    ) : (
                                      <div className="no-image-placeholder">
                                        No Image
                                      </div>
                                    )
                                  }
                                >
                                  <h4>{product.title || "Untitled Product"}</h4>
                                  <p>
                                    {product.shortDescription ||
                                      "No description available"}
                                  </p>
                                  {product.price && (
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                  )}
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col xs={24} md={10}>
          <Productform1 />
        </Col>
      </Row>
    </div>
  );
}

export default Search;
