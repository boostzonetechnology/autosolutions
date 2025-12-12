import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VehicleReport.css";

const currencies = {
  US: { code: "USD", symbol: "$", rate: 1 },
  CA: { code: "CAD", symbol: "$", rate: 1.35 },
  GB: { code: "GBP", symbol: "£", rate: 0.79 },
  AU: { code: "AUD", symbol: "$", rate: 1.52 },
  default: { code: "USD", symbol: "$", rate: 1 },
};

const basePlans = [
  {
    id: "basic",
    name: "Basic Report",
    price: 1.95,
    features: [
      "Basic vehicle specs",
      "Year, Make, Model info",
      "Engine details",
      "Transmission type",
    ],
    color: "#4ECDC4",
  },
  {
    id: "standard",
    name: "Standard Report",
    price: 4.95,
    features: [
      "Everything in Basic",
      "Accident history",
      "Title records",
      "Odometer reading",
      "Recall information",
    ],
    color: "#45B7D1",
  },
  {
    id: "premium",
    name: "Premium Report",
    price: 9.95,
    features: [
      "Everything in Standard",
      "Full vehicle history",
      "Sales records",
      "Market values",
      "Unlimited access for 30 days",
      "Export to PDF",
    ],
    color: "#FF6B6B",
  },
];

const PlansPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userCountry, setUserCountry] = useState("US");

  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setUserCountry(data.country_code || "US");
      } catch (error) {
        console.error("Error detecting country:", error);
        setUserCountry("US");
      }
    };

    detectUserCountry();
  }, []);

  const currency = currencies[userCountry] || currencies.default;

  const handleSelectPlan = (plan) => {
    navigate("/checkout", {
      state: {
        selectedPlan: plan,
        vehicleData: location.state?.vehicleData,
        vin: location.state?.vin,
      },
    });
  };

  const goBack = () => {
    if (location.state?.vin) {
      navigate("/vehicle-report", { state: { vin: location.state.vin } });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="vehicle-report-page">
      <nav className="report-nav">
        <div className="nav-container">
          <div className="logo" onClick={goBack} style={{ cursor: "pointer" }}>
            <span className="logo-icon">🚗</span>
            <span className="logo-text">VIN Decoder Pro</span>
          </div>
          <div className="nav-buttons">
            <button className="nav-back-btn" onClick={goBack}>
              ← Back
            </button>
          </div>
        </div>
      </nav>

      <div className="results-section">
        <div className="results-header">
          <h2>Select a Plan to Unlock the Full Report</h2>
          <p className="report-date">
            Prices shown in {currency.code} based on your location
          </p>
        </div>

        <div className="pricing-plans-section">
          <div className="pricing-plans-grid">
            {basePlans.map((plan) => {
              const price = (plan.price * currency.rate).toFixed(2);
              return (
                <div
                  key={plan.id}
                  className="pricing-plan-card"
                  style={{ borderColor: plan.color }}
                >
                  <div
                    className="plan-header"
                    style={{ backgroundColor: `${plan.color}20` }}
                  >
                    <h4>{plan.name}</h4>
                    <div className="plan-price">
                      <span className="currency">{currency.symbol}</span>
                      <span className="amount">{price}</span>
                      <span className="period">
                        {plan.id === "premium" ? "/30 days" : "/report"}
                      </span>
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
                  <div className="plan-actions">
                    <button
                      className="select-plan-btn"
                      style={{ backgroundColor: plan.color }}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      Select Plan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;

