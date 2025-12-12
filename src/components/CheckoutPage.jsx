import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import "./VehicleReport.css";

const currencies = {
  US: { code: "USD", symbol: "$", rate: 1 },
  CA: { code: "CAD", symbol: "$", rate: 1.35 },
  GB: { code: "GBP", symbol: "£", rate: 0.79 },
  AU: { code: "AUD", symbol: "$", rate: 1.52 },
  default: { code: "USD", symbol: "$", rate: 1 },
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedPlan, vehicleData, vin } = location.state || {};

  const [currency, setCurrency] = useState(currencies.default);
  const [isReady, setIsReady] = useState(false);

  // REDIRECT if no plan was selected
  useEffect(() => {
    if (!selectedPlan) {
      navigate("/plans");
      return;
    }

    const detectUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const nextCurrency = currencies[data.country_code] || currencies.default;
        setCurrency(nextCurrency);
      } catch {
        setCurrency(currencies.default);
      } finally {
        setIsReady(true);
      }
    };

    detectUserCountry();
  }, [navigate, selectedPlan]);

  // When closing modal → return to plans
  const handleClose = () => {
    navigate("/plans");
  };

  // On Payment Success → go to success page
  const handlePaymentSuccess = (userEmail) => {
    navigate("/payment-success", {
      state: {
        selectedPlan,
        vehicleData,
        vin,
        userEmail,
      },
    });
  };

  if (!selectedPlan) return null;

  return (
    <div className="vehicle-report-page">

      {/* Navbar */}
      <nav className="report-nav">
        <div className="nav-container">
          <div className="logo" onClick={handleClose} style={{ cursor: "pointer" }}>
            <span className="logo-icon">🚗</span>
            <span className="logo-text">VIN Decoder Pro</span>
          </div>

          <div className="nav-buttons">
            <button className="nav-back-btn" onClick={handleClose}>
              ← Back
            </button>
          </div>
        </div>
      </nav>

      {/* Payment Modal */}
      {isReady && (
        <PaymentModal
          vehicleData={
            vehicleData || {
              year: "—",
              make: "—",
              model: "—",
            }
          }
          vin={vin || "—"}
          selectedPlan={selectedPlan}
          currency={currency}
          onClose={handleClose}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
