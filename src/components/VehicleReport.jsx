import React, { useState, useEffect } from "react";
import "./VehicleReport.css";
import PaymentModal from './PaymentModal';
import PaymentSuccess from './PaymentSuccess';

const VehicleReport = ({ vin, onBack }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [activeCheck, setActiveCheck] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPricingPlans, setShowPricingPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userCountry, setUserCountry] = useState('US');
  const [userEmail, setUserEmail] = useState(''); // Add email state
  
  const checks = [
    { id: 1, name: "Accidents", icon: "🚗", color: "#FF6B6B" },
    { id: 2, name: "Values", icon: "💰", color: "#4ECDC4" },
    { id: 3, name: "Title Records", icon: "📄", color: "#45B7D1" },
    { id: 4, name: "Recalls", icon: "⚠️", color: "#F9C846" },
    { id: 5, name: "Problem Checks", icon: "🔍", color: "#96CEB4" },
    { id: 6, name: "Specs", icon: "⚙️", color: "#FF8E72" },
    { id: 7, name: "Sales History", icon: "📈", color: "#A593E0" },
    { id: 8, name: "Odometer", icon: "📏", color: "#5DADE2" },
    { id: 9, name: "Salvage Records", icon: "🔧", color: "#58D68D" }
  ];

  const currencies = {
    US: { code: 'USD', symbol: '$', rate: 1 },
    CA: { code: 'CAD', symbol: '$', rate: 1.35 },
    GB: { code: 'GBP', symbol: '£', rate: 0.79 },
    AU: { code: 'AUD', symbol: '$', rate: 1.52 },
    default: { code: 'USD', symbol: '$', rate: 1 }
  };

  const basePlans = [
    {
      id: 'basic',
      name: 'Basic Report',
      price: 1.95,
      features: [
        'Basic vehicle specs',
        'Year, Make, Model info',
        'Engine details',
        'Transmission type'
      ],
      color: '#4ECDC4'
    },
    {
      id: 'standard',
      name: 'Standard Report',
      price: 4.95,
      features: [
        'Everything in Basic',
        'Accident history',
        'Title records',
        'Odometer reading',
        'Recall information'
      ],
      color: '#45B7D1'
    },
    {
      id: 'premium',
      name: 'Premium Report',
      price: 9.95,
      features: [
        'Everything in Standard',
        'Full vehicle history',
        'Sales records',
        'Market values',
        'Unlimited access for 30 days',
        'Export to PDF'
      ],
      color: '#FF6B6B'
    }
  ];

  useEffect(() => {
    detectUserCountry();
    
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 99) {
        progress = 99;
        clearInterval(progressInterval);
        fetchVehicleData();
      }
      setLoadingProgress(progress);
    }, 300);

    const checkInterval = setInterval(() => {
      setActiveCheck(prev => (prev + 1) % checks.length);
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
    };
  }, []);

  const detectUserCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setUserCountry(data.country_code);
    } catch (error) {
      console.error('Error detecting country:', error);
      setUserCountry('US');
    }
  };

  const fetchVehicleData = async () => {
    try {
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${encodeURIComponent(vin)}?format=json`;
      const res = await fetch(url);
      const data = await res.json();
      const vehicle = data?.Results?.[0];

      if (vehicle) {
        const formattedData = {
          year: vehicle.ModelYear || "—",
          make: vehicle.Make || "—",
          model: vehicle.Model || "—",
          trim: vehicle.Trim || "—",
          driveType: vehicle.DriveType || "—",
          brakeSystem: vehicle.BrakeSystemType || "—",
          engine: `${vehicle.DisplacementL || ""}L ${vehicle.EngineCylinders || ""} Cyl ${vehicle.EngineModel || ""}`.trim() || "—",
          manufactured: vehicle.PlantCountry || "—",
          bodyStyle: vehicle.BodyClass || "—",
          tires: vehicle.TireSize || vehicle.WheelSizeFront || "—",
          transmission: vehicle.TransmissionStyle || vehicle.TransmissionDescriptor || "—",
          warranty: "NOT ON FILE",
          msrp: "NOT ON FILE",
          doors: vehicle.Doors || "—",
          seats: vehicle.Seats || "—",
          fuelType: vehicle.FuelTypePrimary || "—",
          country: vehicle.PlantCountry || "—",
          vehicleType: vehicle.VehicleType || "—",
          accidentHistory: "LOCKED 🔒",
          titleRecords: "LOCKED 🔒",
          odometerReading: "LOCKED 🔒",
          salesHistory: "LOCKED 🔒",
          marketValue: "LOCKED 🔒",
          recallInfo: "LOCKED 🔒",
          theftRecords: "LOCKED 🔒",
          insuranceRecords: "LOCKED 🔒",
          previousOwners: "LOCKED 🔒",
          serviceHistory: "LOCKED 🔒"
        };
        
        setVehicleData(formattedData);
        setLoadingProgress(100);
        
        setTimeout(() => {
          setShowResults(true);
          setTimeout(() => {
            setShowPricingPlans(true);
          }, 500);
        }, 800);
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setVehicleData({
        year: "—",
        make: "—",
        model: "—",
        trim: "—",
        driveType: "—",
        brakeSystem: "—",
        engine: "—",
        manufactured: "—",
        bodyStyle: "—",
        tires: "—",
        transmission: "—",
        warranty: "NOT ON FILE",
        msrp: "NOT ON FILE",
        doors: "—",
        seats: "—",
        fuelType: "—",
        country: "—",
        vehicleType: "—",
        accidentHistory: "LOCKED 🔒",
        titleRecords: "LOCKED 🔒",
        odometerReading: "LOCKED 🔒",
        salesHistory: "LOCKED 🔒",
        marketValue: "LOCKED 🔒",
        recallInfo: "LOCKED 🔒",
        theftRecords: "LOCKED 🔒",
        insuranceRecords: "LOCKED 🔒",
        previousOwners: "LOCKED 🔒",
        serviceHistory: "LOCKED 🔒"
      });
      setLoadingProgress(100);
      setTimeout(() => {
        setShowResults(true);
        setTimeout(() => {
          setShowPricingPlans(true);
        }, 500);
      }, 800);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // Show payment modal immediately
    setShowPaymentModal(true);
  };

  // Update this function to accept email parameter
  const handlePaymentSuccess = (email) => {
    setUserEmail(email);
    setShowPaymentModal(false);
    setShowPaymentSuccess(true);
    
    console.log(`Payment successful for ${selectedPlan.name} plan. Email: ${email}`);
    
    // In a real app, you would send the report via email here
    // You can make an API call to your backend to send the email
    
    // For demo purposes, just show success
    alert(`Payment successful! Report will be sent to ${email} shortly.`);
  };

  const goBack = () => {
    onBack();
  };

  const currency = currencies[userCountry] || currencies.default;

  return (
    <div className="vehicle-report-container">
      <div className="report-header">
        <h1>Vehicle History Report</h1>
        <p className="vin-display">VIN: <span>{vin}</span></p>
      </div>

      {!showResults ? (
        <div className="loading-section">
          <div className="loading-header">
            <h2>Searching Vehicle Records for VIN {vin}</h2>
            <div className="progress-percentage">{Math.round(loadingProgress)}%</div>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${loadingProgress}%` }}></div>
            <div className="progress-text">Please Wait...</div>
          </div>
          
          <div className="scanning-text">
            <h3>Scanning Vehicle Databases:</h3>
          </div>
          
          <div className="checks-grid">
            {checks.map((check, index) => (
              <div 
                key={check.id} 
                className={`check-item ${index === activeCheck ? 'active' : ''}`}
                style={{ 
                  borderColor: check.color,
                  backgroundColor: index === activeCheck ? `${check.color}15` : '#f8f9fa'
                }}
              >
                <div className="check-icon" style={{ color: check.color }}>
                  {check.icon}
                </div>
                <div className="check-name">{check.name}</div>
                {index === activeCheck && (
                  <div className="checking-indicator">Checking...</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : showPaymentSuccess ? (
        <PaymentSuccess 
          vehicleData={vehicleData}
          selectedPlan={selectedPlan}
          userEmail={userEmail}
          onBack={goBack}
        />
      ) : (
        <div className="results-section">
          <div className="results-header">
            <h2>Vehicle Report Preview</h2>
            <p className="report-date">Limited preview • Full report requires purchase</p>
          </div>
          
          {vehicleData && (
            <div className="vehicle-details">
              <div className="detail-section">
                <h3>Basic Vehicle Information (FREE)</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{vehicleData.year}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Make:</span>
                    <span className="detail-value">{vehicleData.make}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Model:</span>
                    <span className="detail-value">{vehicleData.model}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Trim:</span>
                    <span className="detail-value">{vehicleData.trim}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Body Style:</span>
                    <span className="detail-value">{vehicleData.bodyStyle}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Vehicle Type:</span>
                    <span className="detail-value">{vehicleData.vehicleType}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Technical Specifications (FREE)</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Engine:</span>
                    <span className="detail-value">{vehicleData.engine}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Transmission:</span>
                    <span className="detail-value">{vehicleData.transmission}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Drive Type:</span>
                    <span className="detail-value">{vehicleData.driveType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Fuel Type:</span>
                    <span className="detail-value">{vehicleData.fuelType}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section locked-section">
                <h3>⚠️ Locked Information - Purchase Required</h3>
                <div className="detail-grid">
                  <div className="detail-item locked">
                    <span className="detail-label">Accident History:</span>
                    <span className="detail-value">{vehicleData.accidentHistory}</span>
                  </div>
                  <div className="detail-item locked">
                    <span className="detail-label">Title Records:</span>
                    <span className="detail-value">{vehicleData.titleRecords}</span>
                  </div>
                  <div className="detail-item locked">
                    <span className="detail-label">Odometer Reading:</span>
                    <span className="detail-value">{vehicleData.odometerReading}</span>
                  </div>
                  <div className="detail-item locked">
                    <span className="detail-label">Sales History:</span>
                    <span className="detail-value">{vehicleData.salesHistory}</span>
                  </div>
                  <div className="detail-item locked">
                    <span className="detail-label">Market Value:</span>
                    <span className="detail-value">{vehicleData.marketValue}</span>
                  </div>
                  <div className="detail-item locked">
                    <span className="detail-label">Recall Information:</span>
                    <span className="detail-value">{vehicleData.recallInfo}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {showPricingPlans && (
            <div className="pricing-plans-section">
              <h3>Unlock Full Vehicle History Report</h3>
              <p className="pricing-subtitle">Choose a plan to access complete vehicle information</p>
              
              <div className="pricing-plans-grid">
                {basePlans.map((plan) => {
                  const price = (plan.price * currency.rate).toFixed(2);
                  return (
                    <div 
                      key={plan.id}
                      className={`pricing-plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                      onClick={() => handlePlanSelect(plan)}
                      style={{ borderColor: plan.color }}
                    >
                      <div className="plan-header" style={{ backgroundColor: `${plan.color}20` }}>
                        <h4>{plan.name}</h4>
                        <div className="plan-price">
                          <span className="currency">{currency.symbol}</span>
                          <span className="amount">{price}</span>
                          <span className="period">{plan.id === 'premium' ? '/30 days' : '/report'}</span>
                        </div>
                      </div>
                      <div className="plan-features">
                        <ul>
                          {plan.features.map((feature, index) => (
                            <li key={index}>
                              <span className="feature-icon">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button 
                        className="select-plan-btn"
                        style={{ backgroundColor: plan.color }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          handlePlanSelect(plan);
                        }}
                      >
                        {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className="currency-notice">
                <p>Prices shown in {currency.code} based on your location</p>
              </div>
            </div>
          )}
          
          <div className="action-buttons">
            <button className="btn back-btn" onClick={goBack}>
              Search Another VIN
            </button>
          </div>
        </div>
      )}
      
      {showPaymentModal && selectedPlan && (
        <PaymentModal
          vehicleData={vehicleData || { year: '—', make: '—', model: '—' }}
          selectedPlan={selectedPlan}
          currency={currency}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default VehicleReport;