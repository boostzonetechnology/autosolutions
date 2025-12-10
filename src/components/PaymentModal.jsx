import React, { useState, useEffect } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ vehicleData, selectedPlan, currency, onClose, onPaymentSuccess }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [userCountry, setUserCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Calculate price based on selected plan and currency
  const price = (selectedPlan.price * currency.rate).toFixed(2);

  // Get vehicle info with fallbacks
  const vehicleYear = vehicleData?.year || '—';
  const vehicleMake = vehicleData?.make || '—';
  const vehicleModel = vehicleData?.model || '—';

  useEffect(() => {
    detectUserCountry();
  }, []);

  const detectUserCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setUserCountry(data.country_code);
    } catch (error) {
      console.error('Error detecting country:', error);
      setUserCountry('US');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    if (!userEmail) {
      alert('Please enter your email address to receive the report');
      return;
    }

    if (!validateEmail(userEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(userEmail);
      onClose();
    }, 1500);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    }
    
    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5);
    }
    
    // Format CVV (max 4 digits)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const memberBenefits = [
    'UNLIMITED VIN Searches',
    'Accidents & Major Issues',
    'Junk/Salvage Records',
    'Odometer & Sales History',
    'Title Records & Title Brands',
    'Lease & Loan Calculators',
    'Recall Lookup & VIN Decoder',
    'Detailed Car Specs & More',
    'Monitor Car Changes',
    'UNLIMITED License Plate Lookups',
    'Market Values & Residual Values',
    'And Much More!'
  ];

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="payment-container">
          {/* Left Column - Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="vehicle-info">
              <div className="check-mark">✓</div>
              <div>
                <h3>Report on {vehicleYear} {vehicleMake} {vehicleModel}</h3>
                <p className="feature">✓ {selectedPlan.name} Report</p>
                <p className="feature">✓ {selectedPlan.id === 'premium' ? '30-Day' : '7-Day'} Unlimited Access</p>
              </div>
            </div>

            <div className="total-section">
              <div className="today-label">Today's Total:</div>
              <div className="price">
                {currency.symbol}{price} {currency.code}
              </div>
              <div className="plan-name">{selectedPlan.name} Plan</div>
            </div>

            <div className="member-benefits">
              <h3>Plan Features</h3>
              <ul>
                {selectedPlan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="benefit-icon">✓</span>
                    <span className="benefit-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="payment-methods">
            <h2>Complete Your Purchase</h2>
            
            {/* Email Input */}
            <div className="email-input-section">
              <label htmlFor="email">Email Address (Report will be sent here)</label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="email-input"
                required
              />
            </div>
            
            <h3>Choose Payment Method</h3>
            <div className="payment-options">
              <div 
                className={`payment-option ${selectedPayment === 'google-pay' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('google-pay')}
              >
                <div className="payment-icon">G</div>
                <div className="payment-name">Google Pay</div>
              </div>

              <div 
                className={`payment-option ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('paypal')}
              >
                <div className="payment-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.522 0-.968.382-1.05.9l-1.12 7.106zm15.284-9.59c-.23-.983-.556-1.934-.967-2.806-.5-.98-1.098-1.9-1.785-2.75C18.303 4.689 16.32 3.64 13.855 3.64h-5.43c-.163 0-.324.008-.481.022-.477.05-.822.44-.78.917l1.562 9.865c.04.477.445.83.92.78.157-.015.314-.022.47-.022h3.73c4.487 0 8.192-1.832 9.464-7.212z"/>
                  </svg>
                </div>
                <div className="payment-name">PayPal</div>
              </div>

              <div 
                className={`payment-option ${selectedPayment === 'credit-card' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('credit-card')}
              >
                <div className="payment-icon">💳</div>
                <div className="payment-name">Credit Card</div>
              </div>
            </div>

            {/* Card Details Form (shown when credit card selected) */}
            {selectedPayment === 'credit-card' && (
              <div className="card-details-form">
                <h4>Enter Card Details</h4>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Cardholder Name"
                    value={cardDetails.name}
                    onChange={handleCardInputChange}
                    className="card-input"
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="number"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={handleCardInputChange}
                    className="card-input"
                  />
                </div>
                <div className="form-row double">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={handleCardInputChange}
                    className="card-input"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    className="card-input"
                  />
                </div>
              </div>
            )}

            {/* PayPal Button */}
            {selectedPayment === 'paypal' && (
              <div className="paypal-section">
                <div className="paypal-logo">
                  <svg viewBox="0 0 24 24" width="80" height="80">
                    <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.522 0-.968.382-1.05.9l-1.12 7.106zm15.284-9.59c-.23-.983-.556-1.934-.967-2.806-.5-.98-1.098-1.9-1.785-2.75C18.303 4.689 16.32 3.64 13.855 3.64h-5.43c-.163 0-.324.008-.481.022-.477.05-.822.44-.78.917l1.562 9.865c.04.477.445.83.92.78.157-.015.314-.022.47-.022h3.73c4.487 0 8.192-1.832 9.464-7.212z"/>
                  </svg>
                </div>
                <p className="paypal-text">You will be redirected to PayPal to complete your payment</p>
                <button className="paypal-button">Pay with PayPal</button>
              </div>
            )}

            {/* Google Pay Button */}
            {selectedPayment === 'google-pay' && (
              <div className="google-pay-section">
                <div className="google-pay-logo">
                  <svg viewBox="0 0 24 24" width="80" height="80">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <p className="google-pay-text">Fast and secure payment with Google Pay</p>
                <button className="google-pay-button">Pay with Google Pay</button>
              </div>
            )}

            {/* Submit Button */}
            <button 
              className="submit-payment-btn"
              onClick={handlePaymentSubmit}
              disabled={isProcessing || !selectedPayment || !userEmail}
            >
              {isProcessing ? 'Processing Payment...' : `Pay ${currency.symbol}${price}`}
            </button>

            <div className="security-notice">
              <div className="lock-icon">🔒</div>
              <p>Your payment is secure and encrypted. Report will be emailed to {userEmail || 'your provided email'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;