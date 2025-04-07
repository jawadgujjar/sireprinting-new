import React, { useState } from "react";
import { FaSearch, FaPhone, FaBars, FaTimes } from "react-icons/fa";
import "./navbar1.css";

const Navbar1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchActive, setSearchActive] = useState(false);

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
    {
      name: "Home",
      dropdown: false,
    },
    {
      name: "Products",
      dropdown: true,
      items: ["Product 1", "Product 2", "Product 3", "Product 4"],
    },
    {
      name: "Services",
      dropdown: true,
      items: ["Service 1", "Service 2", "Service 3"],
    },
    {
      name: "Solutions",
      dropdown: true,
      items: [
        "Solution 1",
        "Solution 2",
        "Solution 3",
        "Solution 4",
        "Solution 5",
      ],
    },
    {
      name: "About",
      dropdown: true,
      items: ["Company", "Team", "History", "Mission"],
    },
    {
      name: "Blog",
      dropdown: false,
    },
    {
      name: "Contact",
      dropdown: true,
      items: ["Email", "Phone", "Location", "Support"],
    },
    {
      name: "Pricing",
      dropdown: false,
    },
    {
      name: "Resources",
      dropdown: true,
      items: ["Docs", "Tutorials", "Videos", "Webinars"],
    },
    {
      name: "Support",
      dropdown: true,
      items: ["FAQ", "Help Center", "Community"],
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <a href="/">YourLogo</a>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Main Nav */}
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
                    {item.items.map((subItem, subIndex) => (
                      <a key={subIndex} href="#" className="dropdown-item">
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className={`search-container ${searchActive ? "active" : ""}`}>
            <FaSearch className="search-icon" onClick={toggleSearch} />
            <input
              type="text"
              placeholder="Search..."
              className={`search-input ${searchActive ? "active" : ""}`}
            />
          </div>
          <div className="nav-right">
            <div className="phone-number">
              <FaPhone className="phone-icon" />
              <span>+1 (123) 456-7890</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
