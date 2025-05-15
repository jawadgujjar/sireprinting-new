import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import "./navbar1.css";
import { Button } from "antd";
import { useUser } from "../../contextapi/userContext.js";

const Navbar1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const userMenuRef = useRef(null);
  const navRef = useRef(null);

  const { user, logout } = useUser();

  const navItems = [
    {
      name: "Custom Packaging",
      dropdown: true,
      link: "/main-category",
      items: [
        { name: "CBD Packaging Boxes", link: "/all-products" },
        { name: "Candle Packaging", link: "/Candle-Packaging" },
        { name: "Chocolate Packaging", link: "/Chocolate-Packaging" },
        { name: "Cigarette Packaging", link: "/Cigarette-Packaging" },
        { name: "Cosmetic Packaging", link: "/Cosmetic-Packaging" },
        { name: "Cardboard Display Boxes", link: "/Cardboard-Display-Boxes" },
        { name: "Food Packaging", link: "/Food-Packaging" },
        { name: "Custom Gift Boxes", link: "/Custom-Gift-Boxes" },
        { name: "Custom Incense Packaging", link: "/Custom-Incense-Packaging" },
        { name: "Rigid Boxes", link: "/Rigid-Boxes" },
        { name: "Sleeves Packaging", link: "/Sleeves-Packaging" },
      ],
    },
    {
      name: "Packaging Styles",
      dropdown: true,
      link: "/mailer-boxes",
      items: [
        { name: "Folding Boxes", link: "/Folding-Boxes" },
        { name: "Tray Boxes", link: "/Tray-Boxes" },
        { name: "Tuck End Boxes", link: "/Tuck-End-Boxes" },
        { name: "Insert Boxes", link: "/Insert-Boxes" },
        { name: "Rigid Boxes", link: "/Rigid-Boxes" },
        { name: "Boxes with Lid", link: "/Boxes-with-Lid" },
        { name: "Envelopes", link: "/Envelopes" },
        { name: "Cards & Tags", link: "/Cards&Tags" },
        { name: "Gift Box Styles", link: "/Gift-Box-Styles" },
        { name: "Display Boxes", link: "/Display-Boxes" },
      ],
    },
    { name: "Labels & Tags", dropdown: false, link: "/shipping-boxes" },
    { name: "Custom Stickers", dropdown: false, link: "/poly-mailers" },
    {
      name: "Promotional Products",
      dropdown: true,
      link: "/product-boxes",
      items: [
        { name: "Paper Bags", link: "/Paper-Bags" },
        { name: "Custom Envelopes", link: "/Custom-Envelopes" },
      ],
    },
    { name: "Mylar Bags", dropdown: false, link: "/custom-boxes" },
    { name: "Work Showcase", dropdown: false, link: "/portfolio" },
    { name: "GET A QUOTE", dropdown: false, link: "/get-a-quote" },
  ];

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

  const handleDropdownToggle = (index) => {
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
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

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
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`nav-item ${item.dropdown ? "has-dropdown" : ""} ${
                  activeDropdown === index ? "active" : ""
                }`}
                onClick={() => item.dropdown && handleDropdownToggle(index)}
                onMouseEnter={() => !isMobileView && handleMouseEnter(index)}
                onMouseLeave={() => !isMobileView && handleMouseLeave()}
              >
                <Link
                  to={item.link}
                  className={`nav-link ${isScrolled ? "scrolled" : ""}`}
                >
                  <span>{item.name}</span>
                </Link>
                {item.dropdown && (
                  <div
                    className={`dropdown-menu ${
                      activeDropdown === index ? "show" : ""
                    }`}
                    onMouseEnter={() =>
                      !isMobileView && handleMouseEnter(index)
                    }
                    onMouseLeave={() => !isMobileView && handleMouseLeave()}
                  >
                    <div className="dropdown-content">
                      <div className="dropdown-main-items">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className="dropdown-item"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                      <div className="dropdown-fixed-content">
                        <h2>Get Help With Expert Guidance</h2>
                        <h3>
                          Need help finding the perfect packaging? Contact us
                          now for a free consultation.
                        </h3>
                        <h3>Call Us at:</h3>
                        <h3>
                          <a href="tel:+447745807425" className="number-tel">
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
            ))}
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
              <div className="user-dropdown-wrapper">
                <div
                  className="user-icon"
                  onClick={() => setShowUserMenu((prev) => !prev)}
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
                    {user?.name}
                  </span>
                </div>
                {showUserMenu && (
                  <div className="user-dropdown-menu">
                    <Button danger onClick={handleLogout}>
                      Logout
                    </Button>
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
