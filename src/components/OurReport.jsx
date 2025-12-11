import React, { useEffect, useState } from "react";
import CarImage from "../assets/bigcar.webp"; // Your big red car image
import '../components/OurReport.css';
const OurReport = () => {
  const [visibleReports, setVisibleReports] = useState([false, false, false, false, false]);
  const [carLoaded, setCarLoaded] = useState(false);
  const [hoveredReport, setHoveredReport] = useState(null);

  const reports = [
  { 
    title: "Mileage", 
    icon: "📊",
    description: "Accurate mileage verification and tracking",
    value: "98.5%",
    color: "var(--primary-color)",      // Changed to primary
    position: "top-left"
  },
  { 
    title: "NHTSA Recalls & Complaints", 
    icon: "⚠️",
    description: "Official recall and safety complaint data",
    value: "100%",
    color: "var(--secondary-color)",    // Changed to secondary
    position: "top-right"
  },
  { 
    title: "Accidents", 
    icon: "🚨",
    description: "Comprehensive accident history reports",
    value: "99.2%",
    color: "var(--tertiary-color)",     // Changed to tertiary
    position: "bottom-left"
  },
  { 
    title: "Title Record", 
    icon: "📝",
    description: "Complete title and ownership history",
    value: "100%",
    color: "var(--primary-color)",      // Changed to primary
    position: "bottom-right"
  },
  { 
    title: "Problem Checks", 
    icon: "🔍",
    description: "Detailed problem and issue detection",
    value: "97.8%",
    color: "var(--secondary-color)",    // Changed to secondary
    position: "bottom-center"
  }
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleReports(prev => {
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

    const cards = document.querySelectorAll('.report-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="reports" className="reports-section">
      {/* Animated Background Elements */}
      <div className="reports-bg">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="report-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              background: `radial-gradient(circle, ${['#FF6B6B', '#FF8E53', '#4ECDC4'][i % 3]} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="reports-header">
        <h2 className="reports-title">
  <span className="reports-title-text">
    {["OUR", "REPORT"].map((word, wordIndex) => (
      <span 
        key={wordIndex} 
        className="word"
        style={{ marginRight: wordIndex < 1 ? '15px' : '0' }} // space between words
      >
        {word.split('').map((letter, letterIndex) => (
          <span 
            key={letterIndex} 
            className="reports-letter"
            style={{ animationDelay: `${letterIndex * 0.08 + wordIndex * 0.3}s` }}
          >
            {letter}
          </span>
        ))}
      </span>
    ))}
  </span>
</h2>

        
        <div className="reports-subtitle-container">
          <div className="reports-underline">
            <div className="reports-line"></div>
            <div className="reports-dot"></div>
            <div className="reports-line"></div>
          </div>
          
          <p className="reports-subtitle">
            <span className="reports-text-reveal">
              Important Information Mentioned In Our Reports
            </span>
          </p>
          
          <div className="reports-stats-badge">
            <span className="stats-text">Trusted by 50,000+ Users</span>
            <div className="stats-flash"></div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="reports-container">
        {/* Report Cards Container (Circular Layout) */}
        <div className="reports-circle">
          {reports.map((report, idx) => (
            <div 
              key={idx}
              className={`report-card ${report.position} ${visibleReports[idx] ? 'visible' : ''} ${hoveredReport === idx ? 'hovered' : ''}`}
              style={{ 
                animationDelay: `${idx * 0.2}s`,
                '--report-color': report.color
              }}
              onMouseEnter={() => setHoveredReport(idx)}
              onMouseLeave={() => setHoveredReport(null)}
            >
              <div className="report-glow"></div>
              
              {/* Connection Line to Car */}
              <div className="connection-line"></div>
              
              <div className="report-content">
                <div className="report-icon-container">
                  <div className="report-icon-circle">
                    <span className="report-icon">{report.icon}</span>
                    <div className="icon-pulse"></div>
                  </div>
                </div>
                
                <div className="report-details">
                  <h3 className="report-title">
                    <span className="report-title-text">
                      {report.title.split('').map((char, charIndex) => (
                        <span 
                          key={charIndex}
                          className="report-title-char"
                          style={{ animationDelay: `${charIndex * 0.05 + idx * 0.1}s` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </h3>
                  
                  <p className="report-description">{report.description}</p>
                  
                  <div className="report-value">
                    <span className="value-number">{report.value}</span>
                    <span className="value-label">Accuracy</span>
                  </div>
                </div>
                
                <div className="report-progress">
                  <div className="progress-circle">
                    <div className="progress-ring">
                      <div className="progress-fill"></div>
                    </div>
                    <div className="progress-inner">
                      <span className="progress-icon">✓</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="report-corner top-left"></div>
              <div className="report-corner top-right"></div>
              <div className="report-corner bottom-left"></div>
              <div className="report-corner bottom-right"></div>
              
              <div className="report-pulse"></div>
              
              {/* Tooltip */}
              <div className="report-tooltip">
                <span className="tooltip-text">Click for detailed report</span>
                <div className="tooltip-arrow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Central Red Car */}
        <div className="car-container">
          <div className={`car-wrapper ${carLoaded ? 'loaded' : ''}`}>
            <div className="car-frame">
              <img 
                src={CarImage} 
                alt="Red Car" 
                className="red-car"
                onLoad={() => setCarLoaded(true)}
              />
              
              {/* Car Glow Effect */}
              <div className="car-glow"></div>
              
              {/* Floating Details */}
              <div className="car-detail detail-1">
                <span className="detail-icon">🚗</span>
                <div className="detail-text">Full Report</div>
              </div>
              <div className="car-detail detail-2">
                <span className="detail-icon">📋</span>
                <div className="detail-text">Verified</div>
              </div>
              <div className="car-detail detail-3">
                <span className="detail-icon">⚡</span>
                <div className="detail-text">Fast Results</div>
              </div>
              
              {/* Scan Animation */}
              <div className="car-scan">
                <div className="scan-line"></div>
              </div>
              
              {/* Car Info Panel */}
              <div className="car-info">
                <div className="info-header">
                  <span className="info-icon">🔍</span>
                  <span className="info-title">Vehicle Analysis</span>
                </div>
                <div className="info-status">
                  <span className="status-dot active"></span>
                  <span className="status-text">Scanning Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="report-features">
        <div className="features-header">
          <h4 className="features-title">What Makes Our Reports Special</h4>
          <div className="features-underline"></div>
        </div>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🏆</div>
            <div className="feature-content">
              <h5>Comprehensive Data</h5>
              <p>From 300+ data sources nationwide</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <h5>Instant Access</h5>
              <p>Get reports in under 2 minutes</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <div className="feature-content">
              <h5>Secure & Private</h5>
              <p>Your data is 100% protected</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-content">
              <h5>Mobile Friendly</h5>
              <p>Access reports on any device</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}

    </section>
  );
};

export default OurReport;