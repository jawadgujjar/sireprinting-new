import React, { useState, useEffect } from "react";
import { FaPhone, FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./navbar1.css";
import { IoSearchOutline } from "react-icons/io5";

const Navbar1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // const [searchActive, setSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    {
      name: "ALL PRODUCTS",
      dropdown: false,
      link: "/all-products",
    },
    {
      name: "MAILER BOXES",
      dropdown: false,
      link: "/mailer-boxes",
    },
    {
      name: "SHIPPING BOXES",
      dropdown: false,
      link: "/shipping-boxes",
    },
    {
      name: "POLY MAILERS",
      dropdown: true,
      link: "/poly-mailers",
      items: [
        { name: "Custom Poly Mailers", link: "/custom-poly-mailers" },
        {
          name: "100% Compostable Poly Mailers",
          link: "/compostable-poly-mailers",
        },
        {
          name: "100% Recycled Plastic Poly Mailers",
          link: "/recycled-poly-mailers",
        },
        { name: "Recycled Bubble Mailers", link: "/recycled-bubble-mailers" },
        {
          name: "100% Compostable Padded Bubble Mailers",
          link: "/compostable-bubble-mailers",
        },
      ],
    },
    {
      name: "PRODUCT BOXES",
      dropdown: false,
      link: "/product-boxes",
    },
    {
      name: "CUSTOM BOXES",
      dropdown: false,
      link: "/custom-boxes",
    },
    {
      name: "Portfolio",
      dropdown: false,
      link: "/portfolio",
    },
    {
      name: "GET A QUOTE",
      dropdown: false,
      link: "/get-a-quote",
    },
  ];

  const isMobile = window.innerWidth <= 992;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
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
                className={`nav-item ${item.dropdown ? "has-dropdown" : ""}`}
                onClick={() => {
                  if (isMobile && item.dropdown) toggleDropdown(index);
                }}
                onMouseEnter={() =>
                  !isMobile && item.dropdown && toggleDropdown(index)
                }
                onMouseLeave={() => !isMobile && toggleDropdown(null)}
              >
                <Link
                  to={item.link}
                  className={`nav-link ${isScrolled ? "scrolled" : ""}`}
                >
                  {item.name}
                </Link>
                {item.dropdown &&
                  (isMobile
                    ? activeDropdown === index
                    : activeDropdown === index) && (
                    <div className="dropdown-menu show">
                      <div className="dropdown-content">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className="dropdown-item"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-icons">
          <div className="phone-number">
            <a href="tel:+11392383929" className="phone-number">
              <FaPhone
                className={`phone-icons ${isScrolled ? "scrolled" : ""}`}
              />
            </a>{" "}
          </div>
          <div className="phone-number">
            <Link to="/login">
              {" "}
              <FaRegUser
                className={`phone-icons ${isScrolled ? "scrolled" : ""}`}
              />
            </Link>
          </div>
          <div className="phone-number">
            <Link to="/search-products">
              <IoSearchOutline
                className={`phone-icons ${isScrolled ? "scrolled" : ""}`}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
