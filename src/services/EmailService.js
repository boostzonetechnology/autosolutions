// src/services/EmailService.js
class EmailService {
  constructor() {
    // Use environment variable or default to localhost:3001
    this.apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  /**
   * Send contact form email via backend API
   * @param {Object} formData - Contact form data
   * @returns {Promise<Object>} - Response object
   */
  async sendContactEmail(formData) {
    try {
      // Validate required fields
      const validation = this.validateForm(formData);
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
          message: 'Please fix the form errors.'
        };
      }

      // Send request to backend
      const response = await fetch(`${this.apiBaseUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }

      return {
        success: true,
        data: data,
        message: data.message || 'Email sent successfully!'
      };

    } catch (error) {
      console.error('EmailService Error:', error);
      
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
        errorMessage = 'Cannot connect to server. Please check if the backend is running at http://localhost:3001';
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Validate form data
   * @param {Object} formData - Form data to validate
   * @returns {Object} - Validation result
   */
  validateForm(formData) {
    const errors = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message?.trim()) {
      errors.message = 'Message is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Test backend connection
   * @returns {Promise<Object>} - Connection status
   */
  async testConnection() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`);
      const data = await response.json();
      
      return {
        connected: response.ok,
        data: data,
        message: response.ok ? 'Backend is running' : 'Backend connection failed'
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message,
        message: 'Cannot connect to backend server'
      };
    }
  }
}

// Create and export a singleton instance
const emailService = new EmailService();
export default emailService;