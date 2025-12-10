import React, { useState, useEffect } from "react";
import Logo from "../assets/autosolutions_logo.webp";

const HeroSection = ({ onSearchVin }) => {
  const [vin, setVin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const vinNumber = vin.trim().toUpperCase();
    
    if (!vinNumber) {
      setStatus({ message: "Please enter a VIN number", type: "error" });
      return;
    }
    if (vinNumber.length < 5) {
      setStatus({ message: "VIN must be at least 5 characters.", type: "error" });
      return;
    }
    
    setIsLoading(true);
    setStatus({ message: "Processing VIN...", type: "ok" });
    
    setTimeout(() => {
      onSearchVin(vinNumber);
    }, 500);
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
    { label: "OUR PRICING", href: "#pricing", highlight: true }
  ];

  return (
    <section className="hero" id="home">
      {/* Navbar */}
      <nav className={`${isScrolled ? "sticky" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="nav-container">
          <div className="logo">
            <img src={Logo} alt="Auto Solutions LLC Logo" className="logo-img" />
          </div>
          
          {/* Desktop Navigation */}
          <ul className="desktop-nav">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  className={item.highlight ? "highlighted" : ""}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="menu-line line-1"></span>
            <span className="menu-line line-2"></span>
            <span className="menu-line line-3"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)}></div>
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <img src={Logo} alt="Auto Solutions LLC Logo" className="mobile-logo" />
              <button 
                className="mobile-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="mobile-nav-items">
              {navItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  <a 
                    href={item.href} 
                    className={`mobile-nav-link ${item.highlight ? "highlighted" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    <span className="mobile-nav-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mobile-nav-footer">
              <p className="mobile-contact-info">
                <span className="mobile-contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="mobile-contact-info">
                <span className="mobile-contact-icon">✉️</span>
                <span>support@autosolutions.com</span>
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Trusted VIN Check for Used Cars Through Auto Solutions LLC
        </h1>
        
        <div className="unlock-section">
          <h2 className="unlock-title">
            <span className="unlock-title-text">Unlock the Truth</span>
          </h2>
          <p className="unlock-subtitle">
            Stop guessing and start knowing. With our fast and reliable VIN lookup, 
            you can access crucial information like accident history, previous ownership, 
            service records, and more. Whether you're buying or selling a used car, 
            make an informed decision with confidence.
          </p>
        </div>
        
        {/* VIN Decoder Section */}
        <div className="wrapper">
          <div className="subtitle">
            Enter a 17-character VIN to decode vehicle details using the official NHTSA vPIC API.
          </div>

          <form className="vin-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              className="vin-input" 
              maxLength="17" 
              minLength="5" 
              placeholder="Enter VIN (e.g. SALCR2RX0JH123456)" 
              autoComplete="off" 
              required
            />
            <button 
              type="submit" 
              className="btn decode-btn" 
              disabled={isLoading}
              aria-label="Search vehicle history"
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner">⏳</span> 
                  <span className="loading-text">Searching...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon">🔍</span>
                  <span>Search Vehicle History</span>
                </>
              )}
            </button>
          </form>
          
          {status.message && (
            <div className={`status ${status.type}`}>
              {status.message}
            </div>
          )}
          
          {/* Road lines animation */}
          <div className="road-lines"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;