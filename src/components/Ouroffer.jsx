import React, { useEffect, useState } from "react";
import '../components/Ouroffer.css';
import PaymentModal from "./PaymentModal"; // import your modal component

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 31.99, // Changed to number for calculations
    originalPrice: "$49.99",
    features: ["Global Data Source delivered within 24 hours", "Accident Record Check", "Basic Odometer verify", "Vehicle Specifications", "Ownership Summary"],
    icon: "🚗",
    color: "#4CAF50",
    badge: "Popular",
    tagline: "Essential Report"
  },
  {
    id: "silver",
    name: "Silver",
    price: 41.99, // Changed to number for calculations
    originalPrice: "$69.99",
    features: ["Global Data Source delivered within 12 hours", "Accident & Service History", "Odometer Verification", "Market Value Estimation", "Exportable PDF Reports"],
    icon: "🚘",
    color: "#2196F3",
    badge: "Best Value",
    tagline: "Complete Analysis"
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 49.99, // Changed to number for calculations
    originalPrice: "$89.99",
    features: ["Global Data Source delivered within 2 hours", "Vehicle Health Insights", "Vehicle & Police Records", "Insurance Verification", "Unlimited Downloads"],
    icon: "🏎️",
    color: "#FFD700",
    badge: "Premium",
    tagline: "Ultimate Package"
  }
];

const OurOffer = () => {
  const [visiblePlans, setVisiblePlans] = useState([false, false, false]);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Silver
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState(null); // Add vehicle data state

  // Currency configuration
  const [currency] = useState({
    code: "USD",
    symbol: "$",
    rate: 1 // Exchange rate - default to 1 for USD
  });

  // Mock vehicle data - in real app, this would come from props or context
  const mockVehicleData = {
    vin: "1HGCM82633A123456",
    year: "2023",
    make: "Honda",
    model: "Accord",
    color: "Silver",
    engine: "2.0L 4-Cylinder"
  };

  useEffect(() => {
    // Set mock vehicle data - in real app, you'd get this from parent or context
    setVehicleData(mockVehicleData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisiblePlans(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleOrderClick = (planIndex, e) => {
    e?.stopPropagation();
    setSelectedPlan(planIndex);
    setIsPaymentModalOpen(true);
  };

  const handleCardClick = (planIndex) => {
    setSelectedPlan(planIndex);
  };

  const handlePaymentSuccess = (email) => {
    alert(`Payment successful! Report will be sent to ${email}`);
    // In real app, you might want to redirect to a success page or show confirmation
  };

  return (
    <section id="pricing" className="pricing-section">
      {/* Animated Background Elements */}
      <div className="pricing-bg">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="pricing-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              background: `radial-gradient(circle, ${['#FFD700', '#2196F3', '#4CAF50'][i % 3]} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="pricing-header">
        <h2 className="pricing-title">
  <span className="pricing-title-text">
    {["OUR", "OFFER"].map((word, wordIndex) => (
      <span 
        key={wordIndex} 
        className="word"
        style={{ marginRight: wordIndex < 1 ? '15px' : '0' }} // gap between words
      >
        {word.split('').map((letter, letterIndex) => (
          <span 
            key={letterIndex} 
            className="pricing-letter"
            style={{ animationDelay: `${letterIndex * 0.1 + wordIndex * 0.3}s` }}
          >
            {letter}
          </span>
        ))}
      </span>
    ))}
  </span>
</h2>

        
        <div className="pricing-subtitle-container">
          <div className="subtitle-underline">
            <div className="subtitle-line"></div>
            <div className="subtitle-dot"></div>
            <div className="subtitle-line"></div>
          </div>
          
          <p className="pricing-subtitle">
            <span className="subtitle-reveal">
              SAVE MONEY WITH SPECIAL DISCOUNT UP TO 50% OFF
            </span>
          </p>
          
          <div className="discount-badge">
            <span className="discount-text">LIMITED TIME OFFER</span>
            <div className="discount-flash"></div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-cards-container">
        {plans.map((plan, idx) => (
          <div 
            key={idx}
            className={`pricing-card ${visiblePlans[idx] ? 'visible' : ''} ${hoveredPlan === idx ? 'hovered' : ''} ${selectedPlan === idx ? 'selected' : ''}`}
            style={{ 
              animationDelay: `${idx * 0.2}s`,
              '--plan-color': plan.color
            }}
            onMouseEnter={() => setHoveredPlan(idx)}
            onMouseLeave={() => setHoveredPlan(null)}
            onClick={() => handleCardClick(idx)}
          >
            {/* Card Glow Effect */}
            <div className="pricing-glow"></div>
            
            {/* Ribbon Badge */}
            {plan.badge && (
              <div className="plan-badge">
                <span className="badge-text">{plan.badge}</span>
                <div className="badge-corner"></div>
              </div>
            )}

            {/* Card Header */}
            <div className="card-header-pricing">
              <div className="plan-icon-container">
                <div className="plan-icon-circle">
                  <span className="plan-icon">{plan.icon}</span>
                </div>
                <div className="plan-title-wrapper">
                  <h3 className="plan-name">
                    <span className="name-text">
                      {plan.name.split('').map((char, charIndex) => (
                        <span 
                          key={charIndex}
                          className="name-char"
                          style={{ animationDelay: `${charIndex * 0.05 + idx * 0.1}s` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="price-section">
              <div className="price-wrapper">
                <div className="current-price">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{plan.price.toFixed(2)}</span>
                  <span className="price-period">/report</span>
                </div>
                <div className="original-price">
                  <span className="original-text">was</span>
                  <span className="original-amount">{plan.originalPrice}</span>
                </div>
              </div>
              
              <div className="discount-circle">
                <span className="discount-percent">35%</span>
                <span className="discount-label">OFF</span>
              </div>
            </div>

            {/* Features List */}
            <div className="features-container">
              <div className="features-header">
                <span className="features-title">What's Included</span>
                <div className="features-underline"></div>
              </div>
              
              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">{feature}</span>
                    <div className="feature-highlight"></div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <div className="action-section">
              <button 
                className={`order-btn ${selectedPlan === idx ? 'selected' : ''}`}
                onClick={(e) => handleOrderClick(idx, e)}
              >
                <span className="btn-text">
                  <span className="btn-main">Order Now</span>
                  <span className="btn-sub">Get {plan.name} Plan</span>
                </span>
                <span className="btn-arrow">→</span>
                <div className="btn-shine"></div>
              </button>
              
              {idx === 1 && ( // Show popular tag only on Silver plan
                <div className="popular-tag">
                  <span className="tag-icon">🔥</span>
                  <span className="tag-text">Most Popular Choice</span>
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="plan-corner top-left"></div>
            <div className="plan-corner top-right"></div>
            <div className="plan-corner bottom-left"></div>
            <div className="plan-corner bottom-right"></div>
            
            <div className="plan-pulse"></div>
            
            {/* Comparison Tooltip */}
            <div className="comparison-tooltip">
              <span className="tooltip-text">Click to compare plans</span>
              <div className="tooltip-arrow"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Comparison Bar */}
      <div className="comparison-bar">
        <div className="comparison-header">
          <h4 className="comparison-title">Plan Comparison</h4>
          <div className="comparison-toggle">
            <span className="toggle-label">Annual</span>
            <div className="toggle-switch">
              <div className="toggle-slider"></div>
            </div>
            <span className="toggle-label active">Monthly</span>
          </div>
        </div>
        
        <div className="comparison-features">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`comparison-plan ${selectedPlan === idx ? 'active' : ''}`}
              onClick={() => setSelectedPlan(idx)}
            >
              <div className="comparison-name">{plan.name}</div>
              <div className="comparison-price">${plan.price.toFixed(2)}</div>
              <div className="comparison-icon">{plan.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <div className="payment-title">Secure Payment Options</div>
        <div className="payment-icons">
          {['💳', '🏦', '📱', '💎'].map((icon, i) => (
            <div key={i} className="payment-icon">
              <span className="payment-symbol">{icon}</span>
            </div>
          ))}
        </div>
        <p className="payment-note">All transactions are 100% secure and encrypted</p>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && vehicleData && (
        <PaymentModal 
          vehicleData={vehicleData}
          selectedPlan={plans[selectedPlan]}
          currency={currency}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </section>
  );
};

export default OurOffer;