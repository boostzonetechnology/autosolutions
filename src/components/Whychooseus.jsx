import React, { useEffect, useState } from "react";
import Feature1 from "../assets/WhyChooseUs1.webp";
import Feature2 from "../assets/WhyChooseUs2.webp";
import Feature3 from "../assets/Whychooseus3.webp";
import '../components/Whychooseus.css';
const features = [
  { 
    title: "User Friendly Interface", 
    img: Feature1,
    description: "Intuitive design that makes getting vehicle reports simple and straightforward for everyone.",
    stats: "95% User Satisfaction",
    icon: "🎯"
  },
  { 
    title: "Extensive Coverage", 
    img: Feature2,
    description: "Access comprehensive data on millions of vehicles across all makes, models, and years.",
    stats: "10M+ Vehicles Covered",
    icon: "🌐"
  },
  { 
    title: "Accurate Data", 
    img: Feature3,
    description: "Reliable information sourced from trusted databases and official government records.",
    stats: "99.8% Accuracy Rate",
    icon: "📊"
  }
];

const WhyChooseUs = () => {
  const [visibleCards, setVisibleCards] = useState([false, false, false]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => {
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

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="whychooseus" className="why-section">
      {/* Animated Background Elements */}
      <div className="why-bg-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Section Header with Animation */}
      <div className="why-header">
        <h2 className="heading">
          <span className="heading-text">
          {["WHY", "CHOOSE", "US"].map((word, wordIndex) => (
            <span key={wordIndex} className="word" style={{ marginRight: wordIndex < 2 ? '10px' : '0' }}>
              {word.split('').map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className="heading-letter"
                  style={{ animationDelay: `${letterIndex * 0.1 + wordIndex * 0.3}s` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </span>

        </h2>
        
        <div className="heading-underline">
          <div className="underline-bar"></div>
          <div className="underline-dot"></div>
          <div className="underline-bar"></div>
        </div>

        <p className="description">
          <span className="text-reveal">
            At Auto Solutions LLC, we are committed to providing you with reliable, detailed,
            and accurate vehicle history reports that help you make informed decisions.
          </span>
        </p>
      </div>

      {/* Enhanced Cards Container */}
      <div className="why-cards-container">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className={`feature-card ${visibleCards[idx] ? 'visible' : ''} ${hoveredCard === idx ? 'hovered' : ''}`}
            style={{ animationDelay: `${idx * 0.2}s` }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Glow Effect */}
            <div className="card-glow"></div>
            
            {/* Image Container with Parallax */}
            <div className="image-container">
              <div className="image-wrapper">
                <img 
                  src={feature.img} 
                  alt={feature.title} 
                  className="feature-image"
                />
                <div className="image-overlay"></div>
                <div className="image-shine"></div>
              </div>
              <div className="image-icon">{feature.icon}</div>
            </div>

            {/* Content Container */}
            <div className="card-content">
              <div className="card-header">
                <h3>
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
                <div className="title-underline"></div>
              </div>
              
              <p className="feature-description">{feature.description}</p>
              
              <div className="feature-stats">
                <span className="stats-icon">📈</span>
                <span className="stats-text">{feature.stats}</span>
              </div>

              {/* Interactive Elements */}
              
            </div>

            {/* Decorative Elements */}
            <div className="card-corner top-left"></div>
            <div className="card-corner top-right"></div>
            <div className="card-corner bottom-left"></div>
            <div className="card-corner bottom-right"></div>
            
            <div className="card-pulse"></div>
          </div>
        ))}
      </div>

      {/* Floating Indicators */}
      <div className="floating-indicators">
        {features.map((_, idx) => (
          <div 
            key={idx} 
            className={`indicator ${visibleCards[idx] ? 'active' : ''}`}
            onClick={() => {
              const element = document.querySelectorAll('.feature-card')[idx];
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            <div className="indicator-dot"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;