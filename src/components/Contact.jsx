// src/components/Contact.js (Updated)
import React, { useState, useRef, useEffect } from "react";
import emailService from "../services/EmailService"; // Import the service
import "../components/Contact.css";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Check backend connection on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const result = await emailService.testConnection();
      if (!result.connected) {
        console.warn('⚠️ Backend not connected:', result.message);
        // Optional: Show a subtle warning
        setSubmitStatus({
          type: "warning",
          message: "Note: Backend server not connected. Form submission won't work until server is running.",
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    };

    checkBackend();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate using service
    const validation = emailService.validateForm(formData);
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use the email service instead of axios
      const result = await emailService.sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "✅ Message sent successfully! We'll get back to you soon.",
        });
        
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        
        setErrors({});
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        // Show validation errors if any
        if (result.errors) {
          setErrors(result.errors);
          setSubmitStatus({
            type: "error",
            message: "Please fix the errors below.",
          });
        } else {
          throw new Error(result.error || result.message || "Failed to send message");
        }
      }
      
    } catch (error) {
      console.error("Email sending failed:", error);
      
      let errorMessage = "Failed to send message. Please try again later.";
      
      if (error.message.includes("Network Error")) {
        errorMessage = "Cannot connect to server. Please make sure the backend is running at http://localhost:3001";
      }
      
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">
            <span className="contact-title-text">GET A QUOTE / SEND US A MESSAGE</span>
          </h2>
          <div className="contact-underline">
            <div className="contact-line"></div>
            <div className="contact-dot"></div>
            <div className="contact-line"></div>
          </div>
          <p className="contact-subtitle">
            Ready to start your project? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="contact-content">
          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Our Location</h3>
              <p>123 Construction Street<br />Building City, BC 12345</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>Phone Number</h3>
              <p>+1 (234) 567-8900<br />+1 (234) 567-8901</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Address</h3>
              <p>info@construction.com<br />support@construction.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Working Hours</h3>
              <p>Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM</p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-wrapper">
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              {/* Status Message */}
              {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                  <i className={`fas fa-${submitStatus.type === "success" ? "check-circle" : 
                                   submitStatus.type === "error" ? "exclamation-circle" : "info-circle"}`}></i>
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <div className="form-group">
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-phone"></i>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <div className="textarea-with-icon">
                  <i className="fas fa-comment-alt"></i>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;