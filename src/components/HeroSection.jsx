import React, { useState, useEffect } from "react";
import Logo from "../assets/autosolutions_logo.webp";

const HeroSection = ({ onSearchVin, shouldFocusInput, onFocusComplete }) => {
  const [vin, setVin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const vinInputRef = React.useRef(null);

  // Focus input when returning from report
  useEffect(() => {
    if (shouldFocusInput && vinInputRef.current) {
      vinInputRef.current.focus();
      onFocusComplete?.();
    }
  }, [shouldFocusInput, onFocusComplete]);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key closes menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Disable body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
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

    // Simulate API call delay
    setTimeout(() => {
      if (onSearchVin) {
        onSearchVin(vinNumber);
      }
      setIsLoading(false);
      setVin("");
      setStatus({ message: "Opening vehicle report...", type: "ok" });
    }, 800);
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Why Choose Us", href: "#whychooseus" },
    { label: "Our Offer", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Our Report", href: "#reports" },
    { label: "Our Mission", href: "#mission" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* ---------------- NAVBAR OUTSIDE HERO ---------------- */}
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
              <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
                ✕
              </button>
            </div>

            <ul className="mobile-nav-items">
              {navItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  <a
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    <span className="mobile-nav-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-nav-footer">
              <p className="mobile-contact-info">📞 +1 (555) 123-4567</p>
              <p className="mobile-contact-info">✉️ support@autosolutions.com</p>
            </div>
          </div>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="hero" id="home">
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
              service records, and more.
            </p>
          </div>

          {/* VIN Decoder Section */}
          <div className="wrapper">
            <div className="subtitle">
              Enter a 17-character VIN to decode vehicle details using the official NHTSA vPIC API.
            </div>

            <form className="vin-form" onSubmit={handleSubmit}>
              <input
                ref={vinInputRef}
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

              <button type="submit" className="btn decode-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Searching...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🔍</span>
                    Search Vehicle History
                  </>
                )}
              </button>
            </form>

            {status.message && (
              <div className={`status ${status.type}`}>{status.message}</div>
            )}

            <div className="road-lines"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;