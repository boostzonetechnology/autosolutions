import React, { useEffect, useState } from "react";
import AboutImage from "../assets/aboutus.webp"; // Add your webp image here
import '../components/AboutUs.css';
const AboutUs = () => {
  const [visibleFeatures, setVisibleFeatures] = useState([false, false, false, false, false]);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aboutFeatures = [
    { 
      title: "Full Inspection", 
      icon: "🔍",
      description: "Comprehensive 300+ point vehicle inspection",
      color: "#FFD700"
    },
    { 
      title: "All In Data", 
      icon: "📊",
      description: "Complete vehicle history from multiple sources",
      color: "#2196F3"
    },
    { 
      title: "Car Based", 
      icon: "🚗",
      description: "Vehicle-specific insights and analytics",
      color: "#4CAF50"
    },
    { 
      title: "All Features", 
      icon: "⚙️",
      description: "Access to premium reporting features",
      color: "#FF6B6B"
    },
    { 
      title: "Recommendation", 
      icon: "💡",
      description: "Personalized insights and suggestions",
      color: "#9C27B0"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleFeatures(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const cards = document.querySelectorAll('.about-feature-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section">
      {/* Animated Background Elements */}
      <div className="about-bg">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="about-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              background: `radial-gradient(circle, ${['#FFD700', '#2196F3', '#4CAF50'][i % 3]} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="about-container">
        {/* Left Column: Image with Animation */}
        <div className="about-image-column">
          <div className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
            <div className="image-frame">
              <img 
                src={AboutImage} 
                alt="About Auto Solutions LLC" 
                className="about-image"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="image-overlay"></div>
              <div className="image-shine"></div>
            </div>
            
            {/* Floating Elements Around Image */}
            <div className="floating-element element-1">🚗</div>
            <div className="floating-element element-2">📈</div>
            <div className="floating-element element-3">🔧</div>
            <div className="floating-element element-4">💯</div>
            
            {/* Image Border Animation */}
            <div className="image-border-animation">
              <div className="border-corner top-left"></div>
              <div className="border-corner top-right"></div>
              <div className="border-corner bottom-left"></div>
              <div className="border-corner bottom-right"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="about-content-column">
          {/* Section Header */}
          <div className="about-header">
            <h2 className="about-title">
              <span className="about-title-text">
                {["A", "B", "O", "U", "T", " ", "U", "S"].map((letter, index) => (
                  <span 
                    key={index} 
                    className="about-letter"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
            
            <div className="about-underline">
              <div className="underline-bar"></div>
              <div className="underline-dot"></div>
              <div className="underline-bar"></div>
            </div>
          </div>

          {/* Description */}
          <div className="about-description">
            <p>
              <span className="text-reveal">
                Your Trusted Partner for Reliable Vehicle History Reports. At Auto Solutions LLC, 
                we believe in empowering car buyers and sellers with transparent and reliable 
                vehicle history reports. Whether you're considering a used car purchase or looking 
                to sell, having access to accurate information is crucial.
              </span>
            </p>
          </div>

          {/* Stats Section */}
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter" data-target="100">0</span>K+
              </div>
              <div className="stat-label">Vehicles Inspected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter" data-target="99">0</span>%
              </div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter" data-target="15">0</span>+
              </div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>

          {/* Features Cards */}
          <div className="about-features">
            {aboutFeatures.map((feature, idx) => (
              <div 
                key={idx}
                className={`about-feature-card ${visibleFeatures[idx] ? 'visible' : ''} ${hoveredFeature === idx ? 'hovered' : ''}`}
                style={{ 
                  animationDelay: `${idx * 0.2}s`,
                  '--feature-color': feature.color
                }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="feature-glow"></div>
                
                <div className="feature-icon-container">
                  <div className="feature-icon-circle">
                    <span className="feature-icon">{feature.icon}</span>
                  </div>
                </div>
                
                <div className="feature-content">
                  <h3 className="feature-title">
                    <span className="title-text">
                      {feature.title.split('').map((char, charIndex) => (
                        <span 
                          key={charIndex}
                          className="title-char"
                          style={{ animationDelay: `${charIndex * 0.05 + idx * 0.1}s` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </h3>
                  
                  <p className="feature-description">{feature.description}</p>
                  
                  <div className="feature-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: hoveredFeature === idx ? '100%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="feature-corner top-left"></div>
                <div className="feature-corner top-right"></div>
                <div className="feature-corner bottom-left"></div>
                <div className="feature-corner bottom-right"></div>
                
                <div className="feature-pulse"></div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="about-cta">
            <button className="learn-more-btn">
              <span className="btn-text">Learn More About Us</span>
              <span className="btn-arrow">→</span>
              <div className="btn-shine"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;