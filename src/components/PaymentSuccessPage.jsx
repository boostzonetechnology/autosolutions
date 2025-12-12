import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, vehicleData, userEmail } = location.state || {};

  useEffect(() => {
    if (!selectedPlan || !userEmail) {
      navigate("/");
    }
  }, [navigate, selectedPlan, userEmail]);

  if (!selectedPlan || !userEmail) {
    return null;
  }

  return (
    <PaymentSuccess
      vehicleData={vehicleData}
      selectedPlan={selectedPlan}
      userEmail={userEmail}
      onBack={() => navigate("/")}
      onViewFullHistory={() => {}}
    />
  );
};

export default PaymentSuccessPage;

