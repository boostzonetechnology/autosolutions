import React, { useEffect, useState } from "react";
import MissionImage from "../assets/labour.webp";
import '../components/OurMission.css' // Your labour image

const OurMission = () => {
  const [visibleElements, setVisibleElements] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const element = document.querySelector('.mission-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const missionPoints = [
    { icon: "🛡️", title: "Safety First", description: "Your security is our top priority in every service" },
    { icon: "🤝", title: "Transparency", description: "Clear, honest communication with no hidden costs" },
    { icon: "⚡", title: "Efficiency", description: "Fast, reliable services that save you time" },
    { icon: "💎", title: "Quality", description: "Premium services with attention to detail" },
    { icon: "❤️", title: "Customer Care", description: "Dedicated support throughout your journey" },
    { icon: "🎯", title: "Accuracy", description: "Precise diagnostics and reliable results" }
  ];

  return (
    <section id="mission" className="mission-section">
      {/* Animated Background Elements */}
      <div className="mission-bg">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="mission-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              background: `radial-gradient(circle, ${['#FFD700', '#4CAF50', '#2196F3'][i % 3]} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="mission-container">
        {/* Left Column: Content */}
        <div className="mission-content-column">
          {/* Section Header */}
          <div className="mission-header">
            <h2 className="mission-title">
              <span className="mission-title-text">
                {["O", "U", "R", " ", "M", "I", "S", "S", "I", "O", "N"].map((letter, index) => (
                  <span 
                    key={index} 
                    className="mission-letter"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
            
            <div className="mission-underline">
              <div className="mission-line"></div>
              <div className="mission-dot"></div>
              <div className="mission-line"></div>
            </div>
          </div>

          {/* Main Mission Statement */}
          <div className="mission-statement">
            <p className={`mission-text ${visibleElements ? 'visible' : ''}`}>
              <span className="text-highlight">YOUR SAFETY IS OUR FIRST PRIORITY.</span> Our mission is to deliver trust, transparency, and quality car services. We aim to simplify car buying with honesty, value, and care.
            </p>
            
            <div className="mission-slogan">
              <span className="slogan-icon">🎯</span>
              <span className="slogan-text">Driving Excellence, Delivering Trust</span>
            </div>
          </div>

          {/* Mission Points Grid */}
          <div className="mission-points">
            {missionPoints.map((point, idx) => (
              <div 
                key={idx}
                className={`mission-point ${visibleElements ? 'visible' : ''}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="point-icon-container">
                  <div className="point-icon-circle">
                    <span className="point-icon">{point.icon}</span>
                  </div>
                </div>
                
                <div className="point-content">
                  <h3 className="point-title">{point.title}</h3>
                  <p className="point-description">{point.description}</p>
                </div>
                
                <div className="point-glow"></div>
                <div className="point-pulse"></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter" data-target="50">0</span>K+
              </div>
              <div className="stat-label">Happy Customers</div>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter" data-target="99">0</span>%
              </div>
              <div className="stat-label">Satisfaction Rate</div>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter" data-target="24">0</span>/7
              </div>
              <div className="stat-label">Support Available</div>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="mission-image-column">
          <div className={`mission-image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
            <div className="image-frame-mission">
              <img 
                src={MissionImage} 
                alt="Our Mission - Dedicated Team at Work" 
                className="mission-labour-image"
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Image Overlay Effects */}
              <div className="image-glow-overlay"></div>
              <div className="image-shine-effect"></div>
              
              {/* Floating Tools */}
              <div className="floating-tool tool-1">🔧</div>
              <div className="floating-tool tool-2">⚙️</div>
              <div className="floating-tool tool-3">🔩</div>
              <div className="floating-tool tool-4">💼</div>
            </div>
            
            {/* Image Info Card */}
            <div className="image-info-card">
              <div className="info-header">
                <span className="info-icon">👨‍🔧</span>
                <div className="info-title">
                  <h4>Expert Team</h4>
                  <p>Certified Professionals</p>
                </div>
              </div>
              <div className="info-features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Skilled Technicians</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Modern Equipment</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Quality Assurance</span>
                </div>
              </div>
            </div>
            
            {/* Quality Badge */}
            <div className="quality-badge">
              <div className="badge-icon">🏆</div>
              <div className="badge-content">
                <span className="badge-title">Certified Excellence</span>
                <span className="badge-subtitle">ISO 9001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mission-cta">
        <div className="cta-content">
          <h3 className="cta-title">Join Our Mission of Excellence</h3>
          <p className="cta-description">Experience the difference with our dedicated team</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">
              <span className="btn-icon">📞</span>
              <span>Contact Us</span>
            </button>
            <button className="cta-btn secondary">
              <span className="btn-icon">💬</span>
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;