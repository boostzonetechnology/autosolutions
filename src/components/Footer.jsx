import React from "react";
import "./Footer.css"; // We'll create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Section with Main Content */}
        <div className="footer-top">
          {/* Left Column - Company Info */}
          <div className="footer-column">
            <div className="footer-logo">
              <div className="logo-icon">
                <i className="fas fa-car"></i>
              </div>
              <h2 className="logo-text">Auto<span>Solutions</span>Pro</h2>
            </div>
            <p className="company-description">
              We provide reliable vehicle history reports by entering a VIN number. Get accurate data on accident history, mileage, title status, and more to make informed decisions.
            </p>
            
            {/* Red Card Image Section */}
            <div className="red-card-section">
              <div className="card-image-container">
                
                <div className="card-glow"></div>
              </div>
              <div className="card-info">
                <h4>Premium VIN Verification Card</h4>
                <p>Get your exclusive verification card for trusted vehicle history reports</p>
                <button className="get-card-btn">
                  <i className="fas fa-credit-card"></i>
                  Get Your Card
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">
              <i className="fas fa-link"></i>
              Quick Links
            </h3>
            <ul className="footer-links">
              <li>
                <a href="/vin-check">
                  <i className="fas fa-search"></i>
                  VIN Check
                </a>
              </li>
              <li>
                <a href="/reports">
                  <i className="fas fa-file-alt"></i>
                  Sample Reports
                </a>
              </li>
              <li>
                <a href="/pricing">
                  <i className="fas fa-tags"></i>
                  Pricing
                </a>
              </li>
              <li>
                <a href="/about">
                  <i className="fas fa-info-circle"></i>
                  About Us
                </a>
              </li>
              <li>
                <a href="/how-it-works">
                  <i className="fas fa-cogs"></i>
                  How It Works
                </a>
              </li>
            </ul>
            
            <div className="legal-links">
              <a href="/terms">
                <i className="fas fa-file-contract"></i>
                Terms & Conditions
              </a>
              <a href="/privacy">
                <i className="fas fa-shield-alt"></i>
                Privacy Policy
              </a>
              <a href="/refund">
                <i className="fas fa-undo-alt"></i>
                Refund Policy
              </a>
              <a href="/faq">
                <i className="fas fa-question-circle"></i>
                FAQs
              </a>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">
              <i className="fas fa-address-book"></i>
              Contact Info
            </h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email Address</h4>
                  <a href="mailto:contact@autosolutionspro.com" className="contact-link">
                    contact@autosolutionspro.com
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h4>Office Location</h4>
                  <p className="contact-address">
                    2444 Corporation Ln,<br />
                    Virginia Beach, VA 23462,<br />
                    USA
                  </p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h4>Phone Number</h4>
                  <a href="tel:+18005551234" className="contact-link">
                    +1 (800) 555-1234
                  </a>
                </div>
              </div>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="newsletter-section">
              <h4>
                <i className="fas fa-paper-plane"></i>
                Stay Updated
              </h4>
              <p>Subscribe to our newsletter for the latest updates</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="footer-bottom">
          {/* Social Media Links */}
          <div className="social-media">
            <a href="https://facebook.com" className="social-link facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="social-link twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" className="social-link linkedin">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" className="social-link instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" className="social-link youtube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <p>
              Copyright © 2025, <span className="highlight">Auto Solutions LLC</span> • All Rights Reserved
            </p>
            <p className="disclaimer">
              This service provides vehicle history reports and is not affiliated with any government agency.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <i className="fab fa-cc-visa" title="Visa"></i>
            <i className="fab fa-cc-mastercard" title="Mastercard"></i>
            <i className="fab fa-cc-amex" title="American Express"></i>
            <i className="fab fa-cc-discover" title="Discover"></i>
            <i className="fab fa-cc-paypal" title="PayPal"></i>
            <i className="fas fa-university" title="Bank Transfer"></i>
          </div>
        </div>

      </div>
      
      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
};

export default Footer;