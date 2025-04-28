import React, { useState, useEffect } from "react";
import { FaPhone, FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { countries } from "country-flag-icons";
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
      name: "Custom Packaging Boxes",
      dropdown: true,
      link: "/category",
      items: [
        { name: "CBD Packaging Boxes", link: "/CBD-Packaging-Boxes" },
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
    {
      name: "Labels & Tags",
      dropdown: false,
      link: "/shipping-boxes",
    },
    {
      name: "Custom Stickers",
      dropdown: false,
      link: "/poly-mailers",
    },
    {
      name: "Promotional Products",
      dropdown: true,
      link: "/product-boxes",
      items: [
        { name: "Paper Bags", link: "/Paper-Bags" },
        { name: "Custom Envelopes", link: "/Custom-Envelopes" },
      ],
    },
    {
      name: "Mylar Bags",
      dropdown: false,
      link: "/custom-boxes",
    },
    {
      name: "Work Showcase",
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
          {/* <img
            src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg"
            alt="USA Flag"
            className="flag"
            title="United States"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb.svg"
            alt="UK Flag"
            className="flag"
            title="United Kingdom"
          /> */}
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
