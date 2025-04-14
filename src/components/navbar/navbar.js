import React, { useState, useEffect } from "react";
import { FaPhone, FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./navbar1.css";
import { IoSearchOutline } from "react-icons/io5";

const Navbar1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
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
    { name: "ALL PRODUCTS", dropdown: false },
    { name: "MAILER BOXES", dropdown: false },
    { name: "SHIPPING BOXES", dropdown: false },
    {
      name: "POLY MAILERS",
      dropdown: true,
      items: [
        "Custom Poly Mailers",
        "100% Compostable Poly Mailers",
        "100% Recycled Plastic Poly Mailers",
        "Recycled Bubble Mailers",
        "100% Compostable Padded Bubble Mailers",
      ],
    },
    { name: "PRODUCT BOXES", dropdown: false },
    { name: "CUSTOM BOXES", dropdown: false },
    { name: "BOXES BY SIZES", dropdown: false },
    { name: "GET A QUOTE", dropdown: false },
  ];

  const isMobile = window.innerWidth <= 992;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="logo">
          <a href="/">
            <img
              className="logo-size"
              alt="logo"
              src="./images/sirepriting.png"
            />
          </a>
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
                <a href="#" className="nav-link">
                  {item.name}
                </a>
                {item.dropdown &&
                  (isMobile
                    ? activeDropdown === index
                    : activeDropdown === index) && (
                    <div className="dropdown-menu show">
                      <div className="dropdown-content">
                        {item.items.map((subItem, subIndex) => (
                          <a key={subIndex} href="#" className="dropdown-item">
                            {subItem}
                          </a>
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
              <FaPhone className="phone-icon" />
            </a>{" "}
          </div>
          <div className="phone-number">
            <Link to="/login">
              {" "}
              <FaRegUser className="phone-icon" />
            </Link>
          </div>
          <div className="phone-number">
            <Link to="/search-products">
              <IoSearchOutline className="phone-icon" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
