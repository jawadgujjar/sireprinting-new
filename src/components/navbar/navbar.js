import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import "./navbar1.css";
import { Button } from "antd";
import { useUser } from "../../contextapi/userContext.js";
import { navitems, subcategory } from "../../utils/axios.js";
import SireprintingLoader from "../loader/loader.js";

const Navbar1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const userMenuRef = useRef(null);
  const navRef = useRef(null);

  const { user, logout } = useUser();

  // Fetch navitems and subcategories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch navitems
        const navItemsResponse = await navitems.get("/");
        const activeNavItems = navItemsResponse.data
          .filter((item) => item.isActive)
          .sort((a, b) => a.position - b.position);
        setNavItems(activeNavItems);

        // Fetch subcategories for each category in navitems
        const subCategoriesData = {};
        for (const navItem of activeNavItems) {
          for (const category of navItem.categories) {
            try {
              const subResponse = await subcategory.get(
                `/category/${category._id}`
              );
              subCategoriesData[category._id] = subResponse.data;
            } catch (error) {
              console.error(
                `Error fetching subcategories for category ${category._id}:`,
                error
              );
              subCategoriesData[category._id] = [];
            }
          }
        }

        setSubCategories(subCategoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check for mobile view on resize and initial load
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 992);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
        setSearchQuery("");
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when shown
  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-products?query=${encodeURIComponent(searchQuery)}`);
      setShowSearchBar(false);
      setSearchQuery("");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const handleDropdownToggle = (index, categoryId) => {
    if (isMobileView) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const handleMouseEnter = (index) => {
    if (!isMobileView) {
      setActiveDropdown(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileView) {
      setActiveDropdown(null);
    }
    setShowUserMenu(false);
  };

  const handleIconClick = () => {
    setShowUserMenu((prev) => !prev);
    navigate("/user-interface");
  };

  const { logoutUser } = useUser();
  const handleLogout = () => {
    logoutUser(); // Clear context + localStorage
    setShowUserMenu(false);
    navigate("/login"); // Redirect to login
  };

  if (loading) {
    return (
      <div className="navbar-loading">
        <SireprintingLoader />
      </div>
    );
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className="navbar-container">
        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="logo">
          <Link to="/">
            <img className="logo-size" alt="logo" src="./images/logo.png" />
          </Link>
        </div>
        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-menu">
            {navItems.map((navItem, navIndex) =>
              navItem.categories.map((category, catIndex) => {
                const index = `${navIndex}-${catIndex}`;
                return (
                  <li
                    key={category._id}
                    className={`nav-item ${
                      subCategories[category._id]?.length > 0
                        ? "has-dropdown"
                        : ""
                    } ${activeDropdown === index ? "active" : ""}`}
                    onClick={() => handleDropdownToggle(index, category._id)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={`/${category.slug}`} // Use API-provided slug
                      state={{ id: category._id }}
                      className={`nav-link ${isScrolled ? "scrolled" : ""}`}
                    >
                      <span>{category.title}</span>
                    </Link>
                    {subCategories[category._id]?.length > 0 && (
                      <div
                        className={`dropdown-menu ${
                          activeDropdown === index ? "show" : ""
                        }`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="dropdown-content">
                          <div className="dropdown-main-items">
                            {subCategories[category._id].map((subCategory) => (
                              <Link
                                key={subCategory._id}
                                to={`/${subCategory.slug}`} // Use API-provided subcategory slug
                                state={{ id: subCategory._id }}
                                className="dropdown-item"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {subCategory.title}
                              </Link>
                            ))}
                          </div>
                          <div className="dropdown-fixed-content">
                            <h2>Get Help With Expert Guidance</h2>
                            <h3>
                              Need help finding the perfect packaging? Contact
                              us now for a free consultation.
                            </h3>
                            <h3>Call Us at:</h3>
                            <h3>
                              <a
                                href="tel:+447745807425"
                                className="number-tel"
                              >
                                074 46124339
                              </a>
                            </h3>
                            <div className="get-navbar-quote-butt">
                              <Button>Get Free Quote</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })
            )}
            <li className="nav-item">
              <Link
                to="/portfolio"
                className={`nav-link ${isScrolled ? "scrolled" : ""}`}
              >
                <span>Product Catalog</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/get-a-quote"
                className={`nav-link ${isScrolled ? "scrolled" : ""}`}
              >
                <span>Get a Quote</span>
              </Link>
            </li>
          </ul>

          {showSearchBar && (
            <div
              ref={searchRef}
              className={`search-dropdown ${showSearchBar ? "show" : ""}`}
            >
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          )}
        </div>

        <div className="nav-icons">
          <div>
            <a href="tel:+11392383929">
              <FaPhone
                className={`phone-icons ${isScrolled ? "scrolled" : ""}`}
              />
            </a>
          </div>

          <div ref={userMenuRef} className="user-icon-container">
            {user ? (
              <div
                className="user-dropdown-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="user-icon"
                  onClick={handleIconClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <FaRegUser
                    className={`phone-icons ${isScrolled ? "scrolled" : ""}`}
                  />
                  <span style={{ marginLeft: 5, color: "#01257d" }}>
                    {user?.name || "User"}
                  </span>
                </div>
                {showUserMenu && (
                  <div className="user-dropdown-menu">
                    <button
                      className="dropdown-button view-data-button"
                      onClick={() => navigate("/user-detail")}
                    >
                      View User Data
                    </button>
                    <button
                      className="dropdown-button logout-button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  alignItems: "center",
                  color: "#01257d",
                }}
              >
                <FaRegUser
                  className={`phone-icons ${isScrolled ? "scrolled" : ""}`}
                />
                <span style={{ marginLeft: 5 }}>Login</span>
              </Link>
            )}
          </div>

          <div
            className="search-icon"
            onClick={() => {
              setShowSearchBar((prev) => !prev);
              setSearchQuery("");
            }}
          >
            <IoSearchOutline
              className={`phone-icons ${isScrolled ? "scrolled" : ""}`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
