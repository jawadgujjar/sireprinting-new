import React, { useState, useEffect } from "react";
import { FaSearch, FaPhone, FaBars, FaTimes } from "react-icons/fa";
import "./navbar1.css";

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
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

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <a href="/">YourLogo</a>
        </div>
        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`nav-item ${item.dropdown ? "has-dropdown" : ""}`}
                onMouseEnter={() => item.dropdown && toggleDropdown(index)}
                onMouseLeave={() => item.dropdown && toggleDropdown(null)}
              >
                <a href="#" className="nav-link">
                  {item.name}
                </a>
                {item.dropdown && (
                  <div
                    className={`dropdown-menu ${
                      activeDropdown === index ? "show" : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
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
          <div className="nav-right">
            <div className="phone-number">
              <FaPhone className="phone-icon" />
              <span>+1 (619) 612-5931</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
